/**
 * External dependencies
 */
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import { Reducer } from 'state/types';
import { SUPPORT_SESSION_TRANSITION } from 'state/action-types';
import { SessionState } from './constants';

const debug = debugFactory( 'calypso:state:support:actions' );

const supportSession: Reducer< SessionState, import('./actions').ActionType > = (
	state = SessionState.SESSION_NONE,
	{ type, nextState }
) => {
	switch ( type ) {
		case SUPPORT_SESSION_TRANSITION:
			if (
				( state === SessionState.SESSION_NONE && nextState === SessionState.SESSION_ACTIVE ) ||
				( state === SessionState.SESSION_ACTIVE && nextState === SessionState.SESSION_EXPIRED )
			) {
				return nextState;
			}

			debug( `invalid support session transition from '${ state }' to '${ nextState }'` );
			return state;

		default:
			return state;
	}
};
export default supportSession;
