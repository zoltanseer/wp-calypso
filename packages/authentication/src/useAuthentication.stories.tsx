/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { useAuthentication } from '.';

export default {
	title: 'useAuthentication',
};

const Story = () => {
	const { status, id, token, expiry } = useAuthentication();
	return (
		<div>
			<p>Status: { JSON.stringify( status, null, 2 ) }</p>
			<p>ID: { JSON.stringify( id, null, 2 ) }</p>
			<p>Token: { JSON.stringify( token, null, 2 ) }</p>
			<p>Expiry: { JSON.stringify( expiry, null, 2 ) }</p>
		</div>
	);
};

export const Default = () => <Story />;
