/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { useSignOut } from '.';

export default {
	title: 'useSignOut',
};

const Story = () => {
	const { signOut } = useSignOut();
	return (
		<div>
			<button onClick={ signOut }>Sign Out</button>
		</div>
	);
};

export const Default = () => <Story />;
