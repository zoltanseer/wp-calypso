/**
 * Internal dependencies
 */
import { Client, ClientMediaItem, ClientItemResponse, ClientItemListResponse } from './Client';

export class MockClient implements Client {
	public constructor( private mocks: Partial< Client > ) {}

	public list( siteId: string ): Promise< ClientItemListResponse > {
		if ( this.mocks.list ) {
			return this.mocks.list( siteId );
		}
		throw new Error( 'A mock for .list() mock is not implemented.' );
	}

	public createFromFile( siteId: string, file: File ): Promise< ClientItemListResponse > {
		if ( this.mocks.createFromFile ) {
			return this.mocks.createFromFile( siteId, file );
		}
		throw new Error( 'A mock for .createFromFile() mock is not implemented.' );
	}

	public createFromURL( siteId: string, url: string ): Promise< ClientItemListResponse > {
		if ( this.mocks.createFromURL ) {
			return this.mocks.createFromURL( siteId, url );
		}
		throw new Error( 'A mock for .createFromURL() mock is not implemented.' );
	}

	public get( siteId: string, mediaId: string ): Promise< ClientItemResponse > {
		if ( this.mocks.get ) {
			return this.mocks.get( siteId, mediaId );
		}
		throw new Error( 'A mock for .get() mock is not implemented.' );
	}

	public update(
		siteId: string,
		mediaId: string,
		data: Partial< ClientMediaItem >
	): Promise< ClientItemResponse > {
		if ( this.mocks.update ) {
			return this.mocks.update( siteId, mediaId, data );
		}
		throw new Error( 'A mock for .update() mock is not implemented.' );
	}

	public delete( siteId: string, mediaId: string ): Promise< ClientItemResponse > {
		if ( this.mocks.delete ) {
			return this.mocks.delete( siteId, mediaId );
		}
		throw new Error( 'A mock for .delete() mock is not implemented.' );
	}
}
