/**
 * Internal dependencies
 */
import { SiteItemMap, Item, ItemStatus } from '../types';
import {
	Action,
	ERRORED_ACTION,
	LOADING_ACTION,
	LOADED_ACTION,
	REFERENCE_ACTION,
	DEREFERENCE_ACTION,
} from './actions';

const initialItemState = {
	refs: 0,
	status: ItemStatus.LOADING,
	error: undefined,
	data: undefined,
};

const setItemState = (
	state: SiteItemMap,
	siteId: string,
	itemId: string,
	nextState: Partial< Item > | ( ( s: Item ) => Partial< Item > )
): SiteItemMap => {
	const currentItemState = state[ siteId ]?.[ itemId ] ?? initialItemState;
	return {
		...state,
		[ siteId ]: {
			...state[ siteId ],
			[ itemId ]: {
				...initialItemState,
				...currentItemState,
				...( typeof nextState === 'function' ? nextState( currentItemState ) : nextState ),
			},
		},
	};
};

export const reducer = ( state: SiteItemMap, action: Action ): SiteItemMap => {
	switch ( action.type ) {
		case ERRORED_ACTION: {
			const { siteId, itemId, error } = action.payload;
			return setItemState( state, siteId, itemId, {
				status: ItemStatus.ERRORED,
				error: error,
				data: undefined,
			} );
		}

		case LOADING_ACTION: {
			const { siteId, itemId } = action.payload;
			return setItemState( state, siteId, itemId, {
				status: ItemStatus.LOADING,
				error: undefined,
				data: undefined,
			} );
		}

		case LOADED_ACTION: {
			const { siteId, itemId, data } = action.payload;
			return setItemState( state, siteId, itemId, {
				status: ItemStatus.LOADED,
				error: undefined,
				data: data,
			} );
		}

		case REFERENCE_ACTION: {
			const { siteId, itemId } = action.payload;
			return setItemState( state, siteId, itemId, s => ( {
				refs: s.refs + 1,
			} ) );
		}

		case DEREFERENCE_ACTION: {
			const { siteId, itemId } = action.payload;
			return setItemState( state, siteId, itemId, s => ( {
				refs: s.refs - 1,
			} ) );
		}

		default:
			return state;
	}
};
