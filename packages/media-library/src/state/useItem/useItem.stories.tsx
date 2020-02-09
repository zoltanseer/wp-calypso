/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { withProvider } from '../withProvider';
import { ItemStatus } from '../types';
import { useItem } from '.';
import { siteId, imageId, loadingClient, loadedClient, erroredClient } from '../../__fixtures__';

const Example = () => {
	const [ status, item, error ] = useItem( siteId, imageId );
	switch ( status ) {
		case ItemStatus.LOADING:
			return <span>Loading...</span>;
		case ItemStatus.LOADED:
			return (
				<div>
					{ item && <h1>{ item.title }</h1> }
					{ item && <img src={ item.link } alt="" /> }
				</div>
			);
		case ItemStatus.ERRORED:
			return (
				<div>
					<h1>Uh oh!</h1>
					<p>{ String( error ) }</p>
				</div>
			);
		default:
			return (
				<div>
					<span role="img" aria-label="Not sure what state we're in.">
						🤔
					</span>
				</div>
			);
	}
};

export default {
	title: 'useItem',
};

export const Loading = withProvider( { client: loadingClient } )( Example );
export const Loaded = withProvider( { client: loadedClient } )( Example );
export const Errored = withProvider( { client: erroredClient } )( Example );
export const MultipleLoaded = withProvider( { client: loadedClient } )( () => (
	<>
		<Example />
		<Example />
	</>
) );
