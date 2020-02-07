/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Context } from './Context';

export const useContext = () => {
	const context = React.useContext( Context );
	if ( ! context ) {
		throw new Error( 'Please nest the component within a <Provider> component.' );
	}
	return context;
};
