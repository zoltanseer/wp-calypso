const STORAGE_KEY = '@automattic/authentication';

export interface StorageData {
	id: string;
	token: string;
	expiry: number | undefined;
}

export class Storage {
	public read(): StorageData | undefined {
		const value = window.localStorage.getItem( STORAGE_KEY );
		if ( value ) {
			const json = JSON.parse( value );
			if ( json ) {
				return {
					id: json.id,
					token: json.token,
					expiry: json.expiry,
				};
			}
		}
		return undefined;
	}

	public write( data: StorageData ) {
		window.localStorage.setItem( STORAGE_KEY, JSON.stringify( data ) );
	}

	public clear() {
		window.localStorage.removeItem( STORAGE_KEY );
	}
}
