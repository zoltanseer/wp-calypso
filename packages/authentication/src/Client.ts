export interface ClientOptions {
	// eslint-disable-next-line: @typescript-eslint/no-explicit-any
	wpcom: any;
	oauthID: string; // wpcom_signup_id
	oauthSecret: string; //wpcom_signup_key
}

export interface CreateUserResult {
	id: string;
	username: string;
	token: string;
}

export class Client {
	private oauthID: string;
	private oauthSecret: string;
	// no typings available
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private wpcom: any;

	constructor( options: ClientOptions ) {
		this.wpcom = options.wpcom;
		this.oauthID = options.oauthID;
		this.oauthSecret = options.oauthSecret;
	}

	createUser( email: string ): Promise< CreateUserResult > {
		return new Promise( ( resolve, reject ) => {
			return this.wpcom.req.post(
				{
					path: '/users/new',
					body: {
						email,
						// locale: 'en-gb',
						client_id: this.oauthID,
						client_secret: this.oauthSecret,
						signup_flow_name: 'onboarding',
						is_passwordless: true,
						validate: false,
						// ab_test_variations: {passwordlessSignup_20291029: "passwordless"}
					},
				},
				( error, data ) => {
					if ( error ) {
						const name = error.name;
						const code = error.error;
						const message = error.message;
						reject( new AuthenticationError( name, code, message ) );
						return;
					}
					if ( data ) {
						resolve( data );
					}
				}
			);
		} );
	}
}
