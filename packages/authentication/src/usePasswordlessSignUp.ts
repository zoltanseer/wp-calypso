/**
 * External dependencies
 */
import { useReducer } from 'react';

/**
 * Internal dependencies
 */
import { useState } from './useState';

export enum UsePasswordlessSignUpStatus {}

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

function reducer( state: State ): State {
	return state;
}

export const usePasswordlessSignUp = (): UsePasswordlessSignUpResult => {
	const { client } = useState();
	const [ { status, error }, dispatch ] = useReducer( reducer, {
		status: undefined,
		error: undefined,
	} );

	const signUp = async ( email: string ) => {
		dispatch( {} );
		try {
			await client.createUser( email );
			dispatch( {} );
		} catch ( error ) {
			dispatch( { error } );
		}
	};

	return {
		signUp,
		status,
		error,
	};
};
