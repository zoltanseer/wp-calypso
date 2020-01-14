/**
 * External dependencies
 */
import { createContext } from 'react';

/**
 * Internal dependencies
 */
import { Client } from './Client';

export interface ContextProps {
	client: Client;
}

export const Context = createContext< ContextProps | undefined >( undefined );
