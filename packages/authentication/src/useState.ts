/**
 * External dependencies
 */
import { useContext } from 'react';

/**
 * Internal dependencies
 */
import { Context } from './Context';

export const useState = () => {
	const state = useContext( Context );
	if ( state === undefined ) {
		throw new Error( '@automattic/authentication requires a Provider wrapping :allthethings:' );
	}
	return state;
};
