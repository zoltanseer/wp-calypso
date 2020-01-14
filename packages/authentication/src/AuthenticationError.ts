export class AuthenticationError extends Error {
	constructor( name: string, code: string, message: string ) {
		super( message );
		this.name = name;
		this.code = code;
		Object.setPrototypeOf( this, AuthenticationError.prototype );
	}
}
