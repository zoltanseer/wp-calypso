/**
 * Internal dependencies
 */
import { useContext } from './useContext';

export const useSignOut = () => {
	const { signOut } = useContext();
	return { signOut };
};
