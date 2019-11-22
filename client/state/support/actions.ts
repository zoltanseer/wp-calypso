/**
 * Internal dependencies
 */

import { SUPPORT_SESSION_TRANSITION } from 'state/action-types';
import { SessionState } from './constants';
import { ActionCreator } from 'redux';

export interface ActionType {
	type: typeof SUPPORT_SESSION_TRANSITION;
	nextState: SessionState;
}

export const supportSessionActivate: ActionCreator< ActionType > = () => ( {
	type: SUPPORT_SESSION_TRANSITION,
	nextState: SessionState.SESSION_ACTIVE,
} );

export const supportSessionExpire: ActionCreator< ActionType > = () => ( {
	type: SUPPORT_SESSION_TRANSITION,
	nextState: SessionState.SESSION_EXPIRED,
} );
