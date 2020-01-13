/**
 * External dependencies
 */
import { createContext } from 'react';

export interface ContextProps {
	noop: () => void;
}

export const Context = createContext< ContextProps | undefined >( {} );
