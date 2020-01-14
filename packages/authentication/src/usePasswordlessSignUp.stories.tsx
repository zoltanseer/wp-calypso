/**
 * External dependencies
 */
import React, { useRef, ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';

/**
 * Internal dependencies
 */
import { Provider } from './Provider';
import { usePasswordlessSignUp, UsePasswordlessSignUpStatus } from './usePasswordlessSignUp';

export default {
	title: 'usePasswordlessSignUp',
	decorators: [
		( storyFn: StoryFn< ReactElement > ) => (
			<Provider clientID="****" clientSecret="****">
				{ storyFn() }
			</Provider>
		),
	],
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
