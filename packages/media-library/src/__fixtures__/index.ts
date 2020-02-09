/**
 * Internal dependencies
 */
import { MockClient } from '../client';

export const siteId = '160146488';

export const imageId = 'image-123';
export const image = {
	id: '123',
	link:
		'https://test790749266.files.wordpress.com/2020/02/e68ecb675ad7c0561595ed4265420a1a.jpg?resize=214%2C214',
	title: 'Its fine!',
};

export const notFoundError = 'Media not found ☹️';

export const loadingClient = new MockClient( {
	get: () =>
		new Promise( () => {
			/* do nothing */
		} ),
} );

export const loadedClient = new MockClient( {
	get: () => Promise.resolve( image ),
} );

export const erroredClient = new MockClient( {
	get: () => Promise.reject( notFoundError ),
} );
