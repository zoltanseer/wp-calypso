/** @format */

/**
 * External dependencies
 */
import { get } from 'lodash';

import { getFilteredSteps } from 'signup/utils';

const initialState = {};
export function getSignupProgress( state ) {
	return get( state, 'signup.progress', initialState );
}

export function getProgressForFlow( state, flowName ) {
	return getFilteredSteps( flowName, getSignupProgress( state ) );
}