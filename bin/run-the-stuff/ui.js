const React = require( 'react' );
const { useState } = React;
const { render, Box, Color } = require( 'ink' );
const importJsx = require( 'import-jsx' );
const MultiSelect = importJsx( 'ink-multi-select' ).default;
const Select = importJsx( 'ink-select-input' ).default;
const args = require( 'yargs' )
	.boolean( 'ss' )
	.boolean( 'sandbox-sync' )
	.boolean( 'all' ).argv;

const { options } = require( './run-the-stuff' );

const GetOptions = ( { cb } ) => {
	// Shortcut if set by args:
	if ( args.all ) {
		cb( options );
		return null;
	}

	const choices = [
		{
			label: 'Run It All!',
			key: 'all',
		},
		...options,
	];
	const onSubmit = items => {
		const choseAll = items.some( ( { key } ) => key === 'all' );
		cb( choseAll ? options : items );
	};
	return (
		<Box flexDirection="column">
			<Color blue>
				Choose any options from the list with space. Hit enter/return to run your selection!
			</Color>
			<MultiSelect items={ choices } onSubmit={ onSubmit } />
		</Box>
	);
};

const GetShouldSync = ( { cb } ) => {
	// Shortcut if set by args:
	if ( args.ss || args[ 'sandbox-sync' ] ) {
		cb( true );
		return null;
	}
	const onSubmit = ( { value } ) => cb( value === 'yes' );

	return (
		<Box flexDirection="column">
			<Color blue>Should I use unison to sync your selected options to your Sandbox?</Color>
			<Select
				items={ [ { label: 'yes', value: 'yes' }, { label: 'no', value: 'no' } ] }
				onSelect={ onSubmit }
			/>
		</Box>
	);
};

const Intro = () => (
	<Color bold>
		Howdy! Run All The Stuff is a handy console app to make managing your hundreds of node processes
		easier.
	</Color>
);

const Initialize = () => {
	const [ runCommands, setOptions ] = useState( null );
	const [ sync, setSync ] = useState( null );
	return (
		<Box flexDirection="column">
			<Intro />
			{ ! runCommands && <GetOptions cb={ setOptions } /> }
			{ runCommands && sync === null && <GetShouldSync cb={ setSync } /> }
		</Box>
	);
};
render( <Initialize /> );
