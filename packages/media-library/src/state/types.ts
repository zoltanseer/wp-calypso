export enum ItemStatus {
	LOADING,
	LOADED,
	UPDATING,
	DELETING,
	DELETED,
	ERRORED,
}

export interface ItemData {
	id: string;
	link: string;
	title: string;
}

export type ItemError = any;

export interface Item {
	refs: number;
	status: ItemStatus;
	data: ItemData | undefined;
	error: ItemError | undefined;
}

export interface ItemMap {
	[ itemId: string ]: Item;
}

export interface SiteItemMap {
	[ siteId: string ]: ItemMap;
}
