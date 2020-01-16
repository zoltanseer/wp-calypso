/**
 * External dependencies
 */
import { EventEmitter } from 'events';

/**
 * Internal dependencies
 */
import { AuthenticationError } from './AuthenticationError';
import { Storage } from './Storage';

export interface ClientOptions {
	baseURL?: string;
	clientID: string; // wpcom_signup_id
	clientSecret: string; //wpcom_signup_key
}

export enum AuthenticationStatus {
	Unauthenticated = 'unauthenticated',
	Authenticated = 'authenticated',
	// TODO: add expired state
	// Expired = 'expired'
}

export interface CreateUserResult {
	token: string;
	id: string;
	username: string;
}

export class Client {
	private baseURL: string;
	private clientID: string;
	private clientSecret: string;
	private emitter = new EventEmitter();
	private storage = new Storage();

	private _status: AuthenticationStatus;
	private _id: string | undefined;
	private _token: string | undefined;
	private _expiry: number | undefined;

	public constructor( options: ClientOptions ) {
		this.baseURL = options.baseURL ?? 'https://public-api.wordpress.com/rest/v1.1';
		this.clientID = options.clientID;
		this.clientSecret = options.clientSecret;

		const data = this.storage.read();
		if ( data ) {
			this._status = AuthenticationStatus.Authenticated;
			this._id = data.id;
			this._token = data.token;
			this._expiry = data.expiry;
			this.emitter.emit( 'change' );
		} else {
			this._status = AuthenticationStatus.Unauthenticated;
			this._id = undefined;
			this._token = undefined;
			this._expiry = undefined;
		}
	}

	private authenticate( {
		id,
		token,
		expiry,
	}: {
		id: string;
		token: string;
		expiry: number | undefined;
	} ) {
		this._status = AuthenticationStatus.Authenticated;
		this._id = id;
		this._token = token;
		this._expiry = expiry;
		this.storage.write( {
			id,
			token,
			expiry,
		} );
		this.emitter.emit( 'change' );
	}

	public get status(): AuthenticationStatus {
		return this._status;
	}

	public get id(): string | undefined {
		return this._id;
	}

	public get token(): string | undefined {
		return this._token;
	}

	public get expiry(): number | undefined {
		return this._expiry;
	}

	public on( type: 'change', listener: () => void ): this {
		this.emitter.on( type, listener );
		return this;
	}

	public off( type: 'change', listener: () => void ): this {
		this.emitter.off( type, listener );
		return this;
	}

	public async passwordlessSignUp( email: string ): Promise< CreateUserResult > {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let json: any;
		try {
			const res = await window.fetch( `${ this.baseURL }/users/new`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( {
					email,
					// locale: 'en-gb',
					client_id: this.clientID,
					client_secret: this.clientSecret,
					signup_flow_name: 'onboarding',
					is_passwordless: true,
					validate: false,
				} ),
			} );
			json = await res.json();
		} catch ( error ) {
			// TODO: return useful and informative error codes
			// eslint-disable-next-line no-console
			console.error( 'authentication error', error );
			throw new AuthenticationError(
				'UnknownAuthenticationError',
				'unknown_auth_error',
				'Authentication was unsuccessful for an unknown reason'
			);
		}

		if ( json && json.success === true ) {
			this.authenticate( {
				id: json.user_id,
				token: json.bearer_token,
				expiry: undefined,
			} );
			return {
				id: json.user_id,
				token: json.bearer_token,
				username: json.username,
			};
		}

		if ( json.error ) {
			throw new AuthenticationError( 'UnknownAuthenticationError', json.error, json.message );
		}
		// TODO: return useful and informative error codes
		// eslint-disable-next-line no-console
		console.error( 'unsuccessful authentication response', json );
		throw new AuthenticationError(
			'UnknownAuthenticationError',
			'unknown_auth_error',
			'Authentication was unsuccessful for an unknown reason'
		);
	}

	public signOut() {
		this._status = AuthenticationStatus.Unauthenticated;
		this._id = undefined;
		this._token = undefined;
		this._expiry = undefined;
		this.storage.clear();
		this.emitter.emit( 'change' );
	}
}
