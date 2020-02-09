/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { withProvider } from '../../state';
import { siteId, imageId, loadingClient, loadedClient, erroredClient } from '../../__fixtures__';
import { Detail } from '.';

const Example = () => <Detail siteId={ siteId } itemId={ imageId } />;

export default {
	title: 'Detail',
};

export const Loading = withProvider( { client: loadingClient } )( Example );
export const Loaded = withProvider( { client: loadedClient } )( Example );
export const Errored = withProvider( { client: erroredClient } )( Example );
