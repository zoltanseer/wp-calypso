/**
 * External dependencies
 */
import React, { useRef, useEffect } from 'react';

/**
 * Internal dependencies
 */
import { usePasswordlessSignUp, UsePasswordlessSignUpStatus } from '.';

export default {
	title: 'usePasswordlessSignUp',
};

const Story = () => {
	const input = useRef< HTMLInputElement >( null );
	const { signUp, status, error } = usePasswordlessSignUp();

	const handleSignUp = ( event: React.FormEvent< HTMLFormElement > ) => {
		event.preventDefault();
		if ( input.current ) {
			signUp( input.current.value );
		}
	};

	useEffect( () => {
		if ( status === UsePasswordlessSignUpStatus.Authenticated ) {
			window.alert( 'Your account has been created!' );
		}
	}, [ status ] );

	return (
		<div>
			<form onSubmit={ handleSignUp }>
				<input ref={ input } type="text" defaultValue="james.newell+x@automattic.com" />
				<button disabled={ status === UsePasswordlessSignUpStatus.Authenticating }>Sign up</button>
			</form>
			<p>Status: { JSON.stringify( status, null, 2 ) }</p>
			<p>Error: { JSON.stringify( String( error ), null, 2 ) }</p>
		</div>
	);
};

export const Default = () => <Story />;
