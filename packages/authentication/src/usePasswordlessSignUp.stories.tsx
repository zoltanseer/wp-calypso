/**
 * External dependencies
 */
import React, { useRef, ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import WPCOM from 'wpcom';
import wpcomProxyRequest from 'wpcom-proxy-request';

/**
 * Internal dependencies
 */
import { Provider } from './Provider';
import { usePasswordlessSignUp } from './usePasswordlessSignUp';

/* ====== START WPCOM SETUP ====== */
const wpcom = new WPCOM( wpcomProxyRequest );
wpcom.request(
	{
		metaAPI: { accessAllUsersBlogs: true },
	},
	function( error ) {
		if ( error ) {
			throw error;
		}
		console.log( 'Proxy now running in "access all user\'s blogs" mode' );
	}
);
/* ====== END WPCOM SETUP ====== */

export default {
	title: 'usePasswordlessSignUp',
	decorators: [
		( storyFn: StoryFn< ReactElement > ) => (
			<Provider wpcom={ wpcom } oauthID="****" oauthSecret="****">
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
				<button>Sign up</button>
			</form>
			{ JSON.stringify( status, null, 2 ) }
			{ JSON.stringify( error, null, 2 ) }
		</div>
	);
};

export const Default = () => (
	// <Provider token="123">
	<Story />
	// </Provider>
);
