/**
 * Internal dependencies
 */
import { useContext } from './useContext';
import { AuthenticationStatus } from './Client';

export type UseAuthenticationStatus = AuthenticationStatus;

export interface UseAuthenticationResult {
	status: UseAuthenticationStatus | undefined;
	id: string | undefined;
	token: string | undefined;
	expiry: number | undefined;
}

export const useAuthentication = (): UseAuthenticationResult => {
	const { status, id, token, expiry } = useContext();
	return {
		status,
		id,
		token,
		expiry,
	};
};
