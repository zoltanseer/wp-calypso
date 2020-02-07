/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { useContext } from '../useContext';
import { ItemStatus, ItemData, ItemError } from '../types';

export type UseItemResult = [ ItemStatus, ItemData | undefined, ItemError | undefined ];

export const useItem = ( siteId: string, itemId: string ): UseItemResult => {
	const { media, reference, dereference, load } = useContext();
	const item = media[ siteId ]?.[ itemId ];

	React.useEffect( () => {
		reference( siteId, itemId );
		return () => dereference( siteId, itemId );
	}, [ siteId, itemId, reference, dereference ] );

	React.useEffect( () => {
		if ( ! item ) {
			load( siteId, itemId );
		}
	}, [ siteId, itemId, item, load ] );

	if ( item ) {
		return [ item.status, item.data, item.error ];
	}

	// the default state
	return [ ItemStatus.LOADING, undefined, undefined ];
};
