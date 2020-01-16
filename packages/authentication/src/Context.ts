/**
 * External dependencies
 */
import { createContext } from 'react';

/**
 * Internal dependencies
 */
import { AuthenticationStatus } from './Client';

export interface ContextProps {
	status: AuthenticationStatus | undefined;
	id: string | undefined;
	token: string | undefined;
	expiry: number | undefined;
	socialSignUp: () => void;
	passwordlessSignUp: ( email: string ) => void;
	signOut: () => void;
}

export const Context = createContext< ContextProps | undefined >( undefined );
