/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Context } from './Context';

export const useContext = () => {
	const state = React.useContext( Context );
	if ( state === undefined ) {
		throw new Error( '@automattic/authentication requires a Provider wrapping :allthethings:' );
	}
	return state;
};
