/**
 * External dependencies
 */
import React, { SFC } from 'react';

/**
 * Internal dependencies
 */
import { Context } from './Context';

export interface ProviderProps {
	children?: React.ReactElement;
}

export const Provider: SFC< ProviderProps > = ( { children } ) => {
	return <Context.Provider value={ {} }>{ children }</Context.Provider>;
};
