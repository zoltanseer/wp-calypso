/**
 * Internal dependencies
 */
import hashPii from './hash-pii';

/**
 * External dependencies
 */
import { UserData } from '../../../../client/lib/user/user';
/**
 * Module variables
 */
let _currentUser: CurrentUser;

export interface CurrentUserHashedPii {
	ID: string;
	username: string;
	email: string;
}
export interface CurrentUser {
	ID: number;
	username: string;
	email: string;
	hashedPii?: CurrentUserHashedPii;
}

/**
 * Gets current user.
 *
 * @returns {object|undefined} Current user.
 */
export function getCurrentUser(): CurrentUser {
	return _currentUser;
}

/**
 * Sets current user, (stored in javascript memory).
 *
 * @param {object} currentUser the user data for the current user
 * @returns {object|undefined} Current user.
 */
export function setCurrentUser( currentUser: UserData ): CurrentUser {
	if (
		! currentUser.ID ||
		isNaN( Number( currentUser.ID ) ) ||
		! currentUser.username ||
		! currentUser.email
	) {
		return; // Invalid user data.
	}
	_currentUser = {
		ID: parseInt( currentUser.ID, 10 ),
		username: currentUser.username,
		email: currentUser.email,
		hashedPii: {
			ID: hashPii( currentUser.ID ),
			username: hashPii( currentUser.username.toLowerCase().replace( /\s/g, '' ) ),
			email: hashPii( currentUser.email.toLowerCase().replace( /\s/g, '' ) ),
		},
	};
	return _currentUser;
}
