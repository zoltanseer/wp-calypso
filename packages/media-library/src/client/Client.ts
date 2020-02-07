export interface ClientMediaItem {
	id: string;
	link: string;
	title: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClientItemResponse extends ClientMediaItem {}

export interface ClientItemListResponse {
	media: ClientMediaItem[];
	errors: string[];
}

export interface Client {
	list( siteId: string ): Promise< ClientItemListResponse >;
	createFromFile( siteId: string, file: File ): Promise< ClientItemListResponse >;
	createFromURL( siteId: string, url: string ): Promise< ClientItemListResponse >;
	get( siteId: string, mediaId: string ): Promise< ClientItemResponse >;
	update(
		siteId: string,
		mediaId: string,
		data: Partial< ClientMediaItem >
	): Promise< ClientItemResponse >;
	delete( siteId: string, mediaId: string ): Promise< ClientItemResponse >;
}
