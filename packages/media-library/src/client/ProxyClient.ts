/**
 * Internal dependencies
 */
import { fetch } from './fetch';
import { Client, ClientMediaItem, ClientItemResponse, ClientItemListResponse } from './Client';

export class ProxyClient implements Client {

	public async list( siteId: string ): Promise<ClientItemListResponse> {
		// TODO: support criteria e.g. mime_type
		const res = await fetch( 'GET', `/sites/${ siteId }/media` );
		return res;
	}

	public async createFromFile( siteId: string, file: File ): Promise<ClientItemListResponse> {
		return await fetch( 'POST', `/sites/${ siteId }/media/new`, [ [ 'media[]', file ] ] );
	}

	public async createFromURL( siteId: string, url: string ): Promise<ClientItemListResponse> {
		return await fetch( 'POST', `/sites/${ siteId }/media/new`, [ [ 'media_urls[]', url ] ] );
	}

	public async get( siteId: string, mediaId: string ): Promise<ClientItemResponse> {
		const res = await fetch( 'GET', `/sites/${ siteId }/media/${ mediaId }` );
		return res;
	}

	public async update(
		siteId: string,
		mediaId: string,
		data: Partial< ClientMediaItem >
	): Promise<ClientItemResponse> {
		const keys: Array< keyof ClientMediaItem > = Object.keys( data ) as any;
		const res = await fetch( 'POST', `/sites/${ siteId }/media/${ mediaId }`, [
			[ 'ID', mediaId ],
			...keys.map( key => [ key, data[ key ] ] ),
		] );
		return res;
	}

	public async delete( siteId: string, mediaId: string ): Promise<ClientItemResponse> {
		const res = await fetch( 'POST', `/sites/${ siteId }/media/${ mediaId }/delete` );
		res.status === 'deleted';
		return res;
	}
}
