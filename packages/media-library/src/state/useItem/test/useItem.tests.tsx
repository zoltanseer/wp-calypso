/**
 * External dependencies
 */
import { renderHook } from '@testing-library/react-hooks';

/**
 * Internal dependencies
 */
import { ItemStatus } from '../../types';
import { wrapWithProvider } from '../../withProvider';
import { useItem } from '../useItem';
import {
	siteId,
	imageId,
	loadingClient,
	loadedClient,
	erroredClient,
	image,
	notFoundError,
} from '../../../__fixtures__';

describe( 'useItem()', () => {
	test( 'returns loading result when loading', () => {
		const { result } = renderHook( () => useItem( siteId, imageId ), {
			wrapper: wrapWithProvider( { client: loadingClient } ),
		} );
		expect( result.current ).toEqual( [ ItemStatus.LOADING, undefined, undefined ] );
	} );

	test( 'returns loaded result when loaded', async () => {
		const { result, waitForNextUpdate } = renderHook( () => useItem( siteId, imageId ), {
			wrapper: wrapWithProvider( { client: loadedClient } ),
		} );
		await waitForNextUpdate();
		expect( result.current ).toEqual( [ ItemStatus.LOADED, image, undefined ] );
	} );

	test( 'returns errored result when errored', async () => {
		const { result, waitForNextUpdate } = renderHook( () => useItem( siteId, imageId ), {
			wrapper: wrapWithProvider( { client: erroredClient } ),
		} );
		await waitForNextUpdate();
		expect( result.current ).toEqual( [ ItemStatus.ERRORED, undefined, notFoundError ] );
	} );

	test.todo( 'client is only called once when there are more than one components using the hook' );
} );
