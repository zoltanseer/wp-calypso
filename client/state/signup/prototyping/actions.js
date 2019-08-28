
import { get, uniq, indexOf } from 'lodash';

/**
 * Internal dependencies
 */
import { 
    steps as stepsData,
    flows as flowsData,
} from 'state/signup/prototyping/reducer';

export const actionTypes = {
	PROTOTYPE_JOURNEY_STEP_ADD: 'PROTOTYPE_JOURNEY_STEP_ADD',
	PROTOTYPE_START_FLOW: 'PROTOTYPE_START_FLOW',
	PROTOTYPE_GO_TO_STEP: 'PROTOTYPE_GO_TO_STEP',
	PROTOTYPE_DEFAULTS: 'PROTOTYPE_DEFAULTS',
	PROTOTYPE_JOURNEY_STEP_REMOVE: 'PROTOTYPE_JOURNEY_STEP_REMOVE',
}

const {
	PROTOTYPE_JOURNEY_STEP_ADD,
	PROTOTYPE_START_FLOW,
	PROTOTYPE_GO_TO_STEP,
	PROTOTYPE_DEFAULTS,
	PROTOTYPE_JOURNEY_STEP_REMOVE,
} = actionTypes;

export const startFlow = flow => ( { 
	type: PROTOTYPE_START_FLOW, 
	flow,
} );

export const addJourneyStep = step => ( {
	type: PROTOTYPE_JOURNEY_STEP_ADD,
	step,
} );

export const removeJourneyStep = step => ( { 
	type: PROTOTYPE_JOURNEY_STEP_REMOVE,
	step,
} );

export const goToStep = ( { flow, step } ) => ( dispatch, getState ) => {
	const state = getState();
	const currentFlow = get( state, 'signup.prototyping.currentFlow', null );
	const currentStep = get( state, 'signup.prototyping.currentStep', null );

	const currentStepIndex = indexOf( get( flowsData, [ flow, 'steps' ] ), currentStep );
	const targetStepIndex = indexOf( get( flowsData, [ flow, 'steps' ] ), step );

	currentStepIndex < targetStepIndex // forward
		? dispatch( addJourneyStep( step ) )
		: dispatch( removeJourneyStep( currentStep ) );

	return dispatch( { 
		type: PROTOTYPE_GO_TO_STEP, 
		flow, 
		step,
	} );
};

