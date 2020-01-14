/**
 * External dependencies
 */
import React, { SFC, useMemo } from 'react';

/**
 * Internal dependencies
 */
import { Client } from './Client';
import { Context } from './Context';

export interface ProviderProps {
	clientID: string;
	clientSecret: string;
	children?: React.ReactElement;
}

export const Provider: SFC< ProviderProps > = ( { clientID, clientSecret, children } ) => {
	const value = useMemo(
		() => ( {
			client: new Client( {
				clientID,
				clientSecret,
			} ),
		} ),
		[ clientID, clientSecret ]
	);
	return <Context.Provider value={ value }>{ children }</Context.Provider>;
};
