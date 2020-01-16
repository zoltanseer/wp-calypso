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
		<dl>
			<dt>Status</dt>
			<dd>{ JSON.stringify( status, null, 2 ) }</dd>
			<dt>ID</dt>
			<dd>{ JSON.stringify( id, null, 2 ) }</dd>
			<dt>Token</dt>
			<dd>{ JSON.stringify( token, null, 2 ) }</dd>
			<dt>Expiry</dt>
			<dd>{ JSON.stringify( expiry, null, 2 ) }</dd>
		</dl>
	);
};

export const Default = () => <Story />;
