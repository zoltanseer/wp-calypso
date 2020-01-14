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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	wpcom: any;
	oauthID: string;
	oauthSecret: string;
	children?: React.ReactElement;
}

export const Provider: SFC< ProviderProps > = ( { wpcom, oauthID, oauthSecret, children } ) => {
	const value = useMemo(
		() => ( {
			client: new Client( {
				wpcom,
				oauthID: oauthID,
				oauthSecret: oauthSecret,
			} ),
		} ),
		[ wpcom, oauthID, oauthSecret ]
	);
	return <Context.Provider value={ value }>{ children }</Context.Provider>;
};
