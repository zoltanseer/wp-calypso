/**
 * External dependencies
 */
import debugFactory from 'debug';
import interpolateComponents from 'interpolate-components';
import Jed from 'jed';
import LRU from 'lru';
import moment from 'moment';
import sha1 from 'hash.js/lib/hash/sha/1';
import { EventEmitter } from 'events';

/**
 * Internal dependencies
 */
import numberFormat from './number-format';

/**
 * Module variables
 */
const debug = debugFactory( 'i18n-calypso' );

/**
 * Constants
 */
const decimal_point_translation_key = 'number_format_decimals';
const thousands_sep_translation_key = 'number_format_thousands_sep';

const translationLookup = [
	// By default don't modify the options when looking up translations.
	function( options ) {
		return options;
	},
];

const hashCache = {};

// raise a console warning
function warn() {
	if ( ! I18N.throwErrors ) {
		return;
	}
	if ( 'undefined' !== typeof window && window.console && window.console.warn ) {
		window.console.warn.apply( window.console, arguments );
	}
}

// turns Function.arguments into an array
function simpleArguments( args ) {
	return Array.prototype.slice.call( args );
}

/**
 * Coerce the possible arguments and normalize to a single object
 * @param  {arguments} args - arguments passed in from `translate()`
 * @return {object}         - a single object describing translation needs
 */
function normalizeTranslateArguments( args ): NormalizedTranslateArgs {
	const original = args[ 0 ];

	// warn about older deprecated syntax
	if (
		typeof original !== 'string' ||
		args.length > 3 ||
		( args.length > 2 && typeof args[ 1 ] === 'object' && typeof args[ 2 ] === 'object' )
	) {
		warn(
			'Deprecated Invocation: `translate()` accepts ( string, [string], [object] ). These arguments passed:',
			simpleArguments( args ),
			'. See https://github.com/Automattic/i18n-calypso#translate-method'
		);
	}
	if ( args.length === 2 && typeof original === 'string' && typeof args[ 1 ] === 'string' ) {
		warn(
			'Invalid Invocation: `translate()` requires an options object for plural translations, but passed:',
			simpleArguments( args )
		);
	}

	// options could be in position 0, 1, or 2
	// sending options as the first object is deprecated and will raise a warning
	let options = {};
	for ( let i = 0; i < args.length; i++ ) {
		if ( typeof args[ i ] === 'object' ) {
			options = args[ i ];
		}
	}

	// `original` can be passed as first parameter or as part of the options object
	// though passing original as part of the options is a deprecated approach and will be removed
	if ( typeof original === 'string' ) {
		options.original = original;
	} else if ( typeof options.original === 'object' ) {
		options.plural = options.original.plural;
		options.count = options.original.count;
		options.original = options.original.single;
	}
	if ( typeof args[ 1 ] === 'string' ) {
		options.plural = args[ 1 ];
	}

	if ( typeof options.original === 'undefined' ) {
		throw new Error( 'Translate called without a `string` value as first argument.' );
	}

	return options;
}

/**
 * Pull the right set of arguments for the Jed method
 * @param  {string} jedMethod Name of jed gettext-style method. [See docs](http://slexaxton.github.io/Jed/)
 * @param  {[object]} props     properties passed into `translate()` method
 * @return {[array]}           array of properties to pass into gettext-style method
 */
function getJedArgs( jedMethod, props ) {
	switch ( jedMethod ) {
		case 'gettext':
			return [ props.original ];
		case 'ngettext':
			return [ props.original, props.plural, props.count ];
		case 'npgettext':
			return [ props.context, props.original, props.plural, props.count ];
		case 'pgettext':
			return [ props.context, props.original ];
	}

	return [];
}

/**
 * Takes translate options object and coerces to a Jed request to retrieve translation
 * @param  {object} jed     - jed data object
 * @param  {object} options - object describing translation
 * @return {string}         - the returned translation from Jed
 */
function getTranslationFromJed( jed, options ) {
	let jedMethod = 'gettext';

	if ( options.context ) {
		jedMethod = 'p' + jedMethod;
	}

	if ( typeof options.original === 'string' && typeof options.plural === 'string' ) {
		jedMethod = 'n' + jedMethod;
	}

	const jedArgs = getJedArgs( jedMethod, options );

	return jed[ jedMethod ].apply( jed, jedArgs );
}

function getTranslation( i18n, options ) {
	for ( let i = translationLookup.length - 1; i >= 0; i-- ) {
		const lookup = translationLookup[ i ]( Object.assign( {}, options ) );
		// Only get the translation from jed if it exists.
		if ( i18n.state.locale[ lookup.original ] ) {
			return getTranslationFromJed( i18n.state.jed, lookup );
		}
	}

	return null;
}

interface NumberFormatOptions {
	decimals?: number;
	decPoint?: string;
	thousandsSep?: string;
}

interface I18NState {
	numberFormatSettings: {
		decimal_point?: string;
		thousands_sep?: string;
	};
	jed?: ReturnType< typeof Jed >;
	locale: undefined;
	localeSlug: undefined | string;
	translations: any;
}

export type Substitution = string | number;

export type Substitutions = Substitution | Substitution[] | { [placeholder: string]: Substitution };

export interface ComponentInterpolations {
	[placeholder: string]: React.ReactElement;
}
export interface TranslateOptions {
	/**
	 * Arguments you would pass into sprintf to be run against the text for string substitution.
	 */
	args?: Substitutions;

	/**
	 * Comment that will be shown to the translator for anything that may need to be explained about the translation.
	 */
	comment?: string;

	/**
	 * Components to be interpolated in the translated string.
	 */
	components?: ComponentInterpolations;

	/**
	 * Provides the ability for the translator to provide a different translation for the same text in two locations (dependent on context). Usually context should only be used after a string has been discovered to require different translations. If you want to provide help on how to translate (which is highly appreciated!), please use a comment.
	 */
	context?: string;
}
type NormalizedTranslateArgs =
	| ( TranslateOptions & { original: string } )
	| ( TranslateOptions & {
			original: string;
			plural: string;
			count: number;
	  } );
export type TranslateResult = string | React.ReactFragment;

export type TranslateHook = (
	translation: TranslateResult,
	options: NormalizedTranslateArgs
) => TranslateResult;

interface I18N {
	defaultLocaleSlug: string;
	state: I18NState;
	componentUpdateHooks: ( () => void )[];
	translateHooks: TranslateHook[];
	stateObserver: EventEmitter;

	moment: typeof moment;

	// EventEmitter-ish
	on( ...args: Parameters< EventEmitter['on'] > ): void;
	off( ...args: Parameters< EventEmitter['off'] > ): void;
	emit( ...args: Parameters< EventEmitter['emit'] > ): void;
}

interface DeprecatedTranslateOptions extends TranslateOptions {
	original: string | { single: string; plural: string; count: number };
}

class I18N implements I18N {
	static throwErrors: boolean = false;

	constructor() {
		if ( ! ( this instanceof I18N ) ) {
			return new I18N();
		}
		this.defaultLocaleSlug = 'en';
		this.state = {
			numberFormatSettings: {},
			jed: undefined,
			locale: undefined,
			localeSlug: undefined,
			translations: LRU( { max: 100 } ),
		};

		this.componentUpdateHooks = [];
		this.translateHooks = [];
		this.stateObserver = new EventEmitter();
		// Because the higher-order component can wrap a ton of React components,
		// we need to bump the number of listeners to infinity and beyond
		// FIXME: still valid?
		this.stateObserver.setMaxListeners( 0 );
		// default configuration
		this.configure();
	}

	configure( options ) {
		Object.assign( this, options || {} );
		this.setLocale();
	}

	/**
	 * Adds new translations to the locale data, overwriting any existing translations with a matching key
	 * @param localeData Locale data
	 */
	addTranslations = function( localeData ) {
		for ( const prop in localeData ) {
			if ( prop !== '' ) {
				this.state.jed.options.locale_data.messages[ prop ] = localeData[ prop ];
			}
		}

		this.state.translations.clear();
		this.stateObserver.emit( 'change' );
	};

	getLocale() {
		return this.state.locale;
	}

	/**
	 * Get the current locale slug.
	 *
	 * @return The string representing the currently loaded locale
	 **/
	getLocaleSlug() {
		return this.state.localeSlug;
	}

	/**
	 * Checks whether the given original has a translation. Parameters are the same as for translate().
	 *
	 * @param  original the string to translate
	 * @param  plural   the plural string to translate (if applicable), original used as singular
	 * @param  options  properties describing translation requirements for given text
	 * @return          whether a translation exists
	 */
	hasTranslation( ...args: Parameters< typeof normalizeTranslateArguments > ) {
		return !! getTranslation( this, normalizeTranslateArguments( ...args ) );
	}

	/**
	 * Formats numbers using locale settings and/or passed options
	 * @param  number  to format (required)
	 * @param  options Number of decimal places or options object (optional)
	 * @return         Formatted number as string
	 */
	numberFormat(
		number: string | number,
		optionsOrDecimalPlaces: NumberFormatOptions | number = {}
	): string {
		const decimals =
			typeof optionsOrDecimalPlaces === 'number'
				? optionsOrDecimalPlaces
				: optionsOrDecimalPlaces.decimals || 0;
		const decPoint =
			optionsOrDecimalPlaces.decPoint || this.state.numberFormatSettings.decimal_point || '.';
		const thousandsSep =
			optionsOrDecimalPlaces.thousandsSep || this.state.numberFormatSettings.thousands_sep || ',';

		return numberFormat( number, decimals, decPoint, thousandsSep );
	}

	registerComponentUpdateHook( callback: () => void ) {
		this.componentUpdateHooks.push( callback );
	}

	registerTranslateHook( callback: TranslateHook ) {
		this.translateHooks.push( callback );
	}

	/**
	 * Causes i18n to re-render all translations.
	 *
	 * This can be necessary if an extension makes changes that i18n is unaware of
	 * and needs those changes manifested immediately (e.g. adding an important
	 * translation hook, or modifying the behaviour of an existing hook).
	 *
	 * If at all possible, react components should try to use the more local
	 * updateTranslation() function inherited from the mixin.
	 */
	reRenderTranslations() {
		debug( 'Re-rendering all translations due to external request' );
		this.state.translations.clear();
		this.stateObserver.emit( 'change' );
	}

	/**
	 * Exposes single translation method, which is converted into its respective Jed method.
	 * See sibling README
	 * @param  original the string to translate
	 * @param  plural   the plural string to translate (if applicable), original used as singular
	 * @param  options  properties describing translation requirements for given text
	 * @return          translated text or an object containing React children that can be inserted into a parent component
	 */
	translate( options: DeprecatedTranslateOptions ): TranslateResult;
	translate( original: string ): TranslateResult;
	translate( original: string, options: TranslateOptions ): TranslateResult;
	translate(
		original: string,
		plural: string,
		options: TranslateOptions & { count: number }
	): TranslateResult;
	translate(
		a: DeprecatedTranslateOptions | string,
		b?: TranslateOptions | string,
		c?: TranslateOptions & { count: number }
	): TranslateResult {
		const options = normalizeTranslateArguments( arguments );

		let optionsString;
		let cacheable = ! options.components;
		if ( cacheable ) {
			// Safe JSON stringification here to catch Circular JSON error
			// caused by passing a React component into args where only scalars are allowed
			try {
				optionsString = JSON.stringify( options );
			} catch ( e ) {
				cacheable = false;
			}

			if ( optionsString ) {
				const translation = this.state.translations.get( optionsString );
				// Return the cached translation.
				if ( translation ) {
					return translation;
				}
			}
		}

		let translation = getTranslation( this, options );
		if ( ! translation ) {
			// This purposefully calls jed for a case where there is no translation,
			// so that jed gives us the expected object with English text.
			translation = getTranslationFromJed( this.state.jed, options );
		}

		// handle any string substitution
		if ( options.args ) {
			const sprintfArgs = Array.isArray( options.args )
				? options.args.slice( 0 )
				: [ options.args ];
			sprintfArgs.unshift( translation );
			try {
				translation = Jed.sprintf.apply( Jed, sprintfArgs );
			} catch ( error ) {
				if ( ! window || ! window.console ) {
					return;
				}
				const errorMethod = I18N.throwErrors ? 'error' : 'warn';
				if ( typeof error !== 'string' ) {
					window.console[ errorMethod ]( error );
				} else {
					window.console[ errorMethod ]( 'i18n sprintf error:', sprintfArgs );
				}
			}
		}

		// interpolate any components
		if ( options.components ) {
			translation = interpolateComponents( {
				mixedString: translation,
				components: options.components,
				throwErrors: I18N.throwErrors,
			} );
		}

		// run any necessary hooks
		this.translateHooks.forEach( function( hook ) {
			translation = hook( translation, options );
		} );

		if ( cacheable ) {
			this.state.translations.set( optionsString, translation );
		}

		return translation;
	}

	setLocale( localeData ) {
		if ( localeData && localeData[ '' ] && localeData[ '' ][ 'key-hash' ] ) {
			const keyHash = localeData[ '' ][ 'key-hash' ];

			const transform = function( string, hashLength ) {
				const lookupPrefix = hashLength === false ? '' : String( hashLength );
				if ( typeof hashCache[ lookupPrefix + string ] !== 'undefined' ) {
					return hashCache[ lookupPrefix + string ];
				}
				const hash = sha1()
					.update( string )
					.digest( 'hex' );

				if ( hashLength ) {
					return ( hashCache[ lookupPrefix + string ] = hash.substr( 0, hashLength ) );
				}

				return ( hashCache[ lookupPrefix + string ] = hash );
			};

			const generateLookup = function( hashLength ) {
				return function( options ) {
					if ( options.context ) {
						options.original = transform(
							options.context + String.fromCharCode( 4 ) + options.original,
							hashLength
						);
						delete options.context;
					} else {
						options.original = transform( options.original, hashLength );
					}

					return options;
				};
			};

			if ( keyHash.substr( 0, 4 ) === 'sha1' ) {
				if ( keyHash.length === 4 ) {
					translationLookup.push( generateLookup( false ) );
				} else {
					const variableHashLengthPos = keyHash.substr( 5 ).indexOf( '-' );
					if ( variableHashLengthPos < 0 ) {
						const hashLength = Number( keyHash.substr( 5 ) );
						translationLookup.push( generateLookup( hashLength ) );
					} else {
						const minHashLength = Number( keyHash.substr( 5, variableHashLengthPos ) );
						const maxHashLength = Number( keyHash.substr( 6 + variableHashLengthPos ) );

						for ( let hashLength = minHashLength; hashLength <= maxHashLength; hashLength++ ) {
							translationLookup.push( generateLookup( hashLength ) );
						}
					}
				}
			}
		}

		// if localeData is not given, assumes default locale and reset
		if ( ! localeData || ! localeData[ '' ].localeSlug ) {
			this.state.locale = { '': { localeSlug: this.defaultLocaleSlug } };
		} else if ( localeData[ '' ].localeSlug === this.state.localeSlug ) {
			// Exit if same data as current (comparing references only)
			if ( localeData === this.state.locale ) {
				return;
			}

			// merge new data into existing one
			Object.assign( this.state.locale, localeData );
		} else {
			this.state.locale = Object.assign( {}, localeData );
		}

		this.state.localeSlug = this.state.locale[ '' ].localeSlug;

		this.state.jed = new Jed( {
			locale_data: {
				messages: this.state.locale,
			},
		} );

		moment.locale( this.state.localeSlug );

		// Updates numberFormat preferences with settings from translations
		this.state.numberFormatSettings.decimal_point = getTranslationFromJed(
			this.state.jed,
			normalizeTranslateArguments( [ decimal_point_translation_key ] )
		);
		this.state.numberFormatSettings.thousands_sep = getTranslationFromJed(
			this.state.jed,
			normalizeTranslateArguments( [ thousands_sep_translation_key ] )
		);

		// If translation isn't set, define defaults.
		if ( this.state.numberFormatSettings.decimal_point === decimal_point_translation_key ) {
			this.state.numberFormatSettings.decimal_point = '.';
		}

		if ( this.state.numberFormatSettings.thousands_sep === thousands_sep_translation_key ) {
			this.state.numberFormatSettings.thousands_sep = ',';
		}

		this.state.translations.clear();
		this.stateObserver.emit( 'change' );
	}
}

I18N.prototype.moment = moment;

I18N.prototype.on = function( ...args ) {
	this.stateObserver.on( ...args );
};

I18N.prototype.off = function( ...args ) {
	this.stateObserver.off( ...args );
};

I18N.prototype.emit = function( ...args ) {
	this.stateObserver.emit( ...args );
};

export default I18N;
