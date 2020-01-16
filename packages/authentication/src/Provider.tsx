/**
 * External dependencies
 */
import React, { SFC, useState, useEffect } from 'react';

/**
 * Internal dependencies
 */
import { Client } from './Client';
import { Context, ContextProps } from './Context';

export interface ProviderProps {
	client: Client;
	children?: React.ReactElement;
}

const noop = () => {
	/* do nothing */
};
const getStateFromClient = ( client: Client ) => ( {
	status: client.status,
	id: client.id,
	token: client.token,
	expiry: client.expiry,
} );

export const Provider: SFC< ProviderProps > = ( { client, children } ) => {
	const [ { status, id, token, expiry }, setState ] = useState( getStateFromClient( client ) );

	useEffect( () => {
		const listener = () => setState( getStateFromClient( client ) );
		client.on( 'change', listener );
		return () => {
			client.off( 'change', listener );
		};
	}, [ client ] );

	const context: ContextProps = {
		status,
		id,
		token,
		expiry,
		socialSignUp: noop,
		passwordlessSignUp: client.passwordlessSignUp.bind( client ),
		signOut: client.signOut.bind( client ),
	};

	return <Context.Provider value={ context }>{ children }</Context.Provider>;
};
