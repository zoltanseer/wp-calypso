/*
 * These utilities are primarily for testing/storybook utilities - they don't make much sense outside of that
 */

/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Provider, ProviderProps } from './Provider';

export type WithProviderOptions = ProviderProps;

export const withProvider = ( options: WithProviderOptions ) => (
	Component: React.FC
): React.FC => props => (
	<Provider { ...options }>
		<Component { ...props } />
	</Provider>
);

export const wrapWithProvider = ( options: WithProviderOptions ) =>
	withProvider( options )( ( { children } ) => <>{ children }</> );
