/**
 * External dependencies
 */
import { useReducer } from 'react';

/**
 * Internal dependencies
 */
import { useContext } from './useContext';

export enum UsePasswordlessSignUpStatus {
	Authenticating = 'authenticating',
	Authenticated = 'authenticated',
	Errored = 'errored',
}

export interface UsePasswordlessSignUpResult {
	signUp: ( email: string ) => void;
	status: UsePasswordlessSignUpStatus | undefined;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any | undefined;
}

interface State {
	status: UsePasswordlessSignUpStatus | undefined;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any | undefined;
}

type Action =
	| { type: 'authenticating' }
	| { type: 'authenticated' }
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| { type: 'errored'; error: any };

const initialState: State = {
	status: undefined,
	error: undefined,
};

const reducer = ( _state: State, action: Action ): State => {
	switch ( action.type ) {
		case 'authenticating': {
			return {
				status: UsePasswordlessSignUpStatus.Authenticating,
				error: undefined,
			};
		}
		case 'authenticated': {
			return {
				status: UsePasswordlessSignUpStatus.Authenticated,
				error: undefined,
			};
		}
		case 'errored': {
			return {
				status: UsePasswordlessSignUpStatus.Errored,
				error: action.error,
			};
		}
	}
};

export const usePasswordlessSignUp = (): UsePasswordlessSignUpResult => {
	const { passwordlessSignUp } = useContext();
	const [ { status, error }, dispatch ] = useReducer( reducer, initialState );

	const signUp = async ( email: string ) => {
		dispatch( { type: 'authenticating' } );
		try {
			await passwordlessSignUp( email );
			dispatch( { type: 'authenticated' } );
		} catch ( e ) {
			dispatch( { type: 'errored', error: e } );
		}
	};

	return {
		signUp,
		status,
		error,
	};
};
