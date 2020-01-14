/**
 * Internal dependencies
 */
import { AuthenticationError } from './AuthenticationError';

export interface ClientOptions {
	baseURL?: string;
	clientID: string; // wpcom_signup_id
	clientSecret: string; //wpcom_signup_key
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

	constructor( options: ClientOptions ) {
		this.baseURL = options.baseURL ?? 'https://public-api.wordpress.com/rest/v1.1';
		this.clientID = options.clientID;
		this.clientSecret = options.clientSecret;
	}

	async createUser( email: string ): Promise< CreateUserResult > {
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
			console.log( 'ERROR' );
			// TODO: return useful and informative error codes
			console.error( 'authentication error', error );
			throw new AuthenticationError(
				'UnknownAuthenticationError',
				'unknown_auth_error',
				'Authentication was unsuccessful for an unknown reason'
			);
		}

		if ( json && json.success === true ) {
			return {
				token: json.bearer_token,
				id: json.user_id,
				username: json.username,
			};
		}

		if ( json.error ) {
			throw new AuthenticationError( 'UnknownAuthenticationError', json.error, json.message );
		}
		// TODO: return useful and informative error codes
		console.error( 'unsuccessful authentication response', json );
		throw new AuthenticationError(
			'UnknownAuthenticationError',
			'unknown_auth_error',
			'Authentication was unsuccessful for an unknown reason'
		);
	}
}
