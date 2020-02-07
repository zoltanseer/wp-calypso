/**
 * Internal dependencies
 */
import { Client } from '../../client';
import { ItemData } from '../types';

export const ERRORED_ACTION = 'errored';

export const LOADING_ACTION = 'loading';
export const LOADED_ACTION = 'loaded';

export const REFERENCE_ACTION = 'reference';
export const DEREFERENCE_ACTION = 'dereference';

export interface ErroredAction {
	type: typeof ERRORED_ACTION;
	payload: { siteId: string; itemId: string; error: any };
}

export interface LoadingAction {
	type: typeof LOADING_ACTION;
	payload: { siteId: string; itemId: string };
}

export interface LoadedAction {
	type: typeof LOADED_ACTION;
	payload: { siteId: string; itemId: string; data: ItemData };
}

export interface RefrenceAction {
	type: typeof REFERENCE_ACTION;
	payload: { siteId: string; itemId: string };
}

export interface DerefrenceAction {
	type: typeof DEREFERENCE_ACTION;
	payload: { siteId: string; itemId: string };
}

export type Action =
	| ErroredAction
	| LoadingAction
	| LoadedAction
	| RefrenceAction
	| DerefrenceAction;

export const createActions = ( client: Client, dispatch: React.Dispatch< Action > ) => ( {
	load: async ( siteId: string, itemId: string ) => {
		try {
			dispatch( {
				type: LOADING_ACTION,
				payload: { siteId, itemId },
			} );
			const data = await client.get( siteId, itemId );
			dispatch( {
				type: LOADED_ACTION,
				payload: { siteId, itemId, data },
			} );
		} catch ( error ) {
			dispatch( {
				type: ERRORED_ACTION,
				payload: { siteId, itemId, error },
			} );
		}
	},

	reference: ( siteId: string, itemId: string ) =>
		dispatch( {
			type: REFERENCE_ACTION,
			payload: { siteId, itemId },
		} ),

	dereference: ( siteId: string, itemId: string ) =>
		dispatch( {
			type: DEREFERENCE_ACTION,
			payload: { siteId, itemId },
		} ),
} );
