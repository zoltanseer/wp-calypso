/** @format */

import { get, uniq, without } from 'lodash';

/**
 * Internal dependencies
 */
import { createReducer, combineReducers } from 'state/utils';

import { actionTypes } from './actions';


`
	stepNames: [ gives, the, order ]
`

const { 
	PROTOTYPE_JOURNEY_STEP_ADD,
	PROTOTYPE_START_FLOW,
	PROTOTYPE_GO_TO_STEP,
	PROTOTYPE_DEFAULTS,
	PROTOTYPE_JOURNEY_STEP_REMOVE,
} = actionTypes;

// const {} = actionTypes;

export const flows = ( {
	'flow-a': {
		flowName: 'flow-a',
		// lets assume we switch on step c here
		steps: [ 'step-a', 'step-b', 'step-c', 'step-d' ],
	},
	'flow-b': {
		flowName: 'flow-b',
		steps: [ 'step-b', 'step-e', 'step-d' ],
	},
	'flow-c': {
		flowName: 'flow-c',
		steps: [ 'step-c', 'step-e', 'step-f', 'step-g', 'step-a' ],
	},
} );


export const steps = ( {
	'step-a': {
		name: 'step-a',
	},
	'step-b': {
		name: 'step-b',
	},
	'step-c': {
		name: 'step-c',
		branches: [ 
			{
				'flow': 'flow-a',
				'step': 'step-d',
			},
			{
				'flow': 'flow-b',
				'step': 'step-e',
			},
			{
				'flow': 'flow-c',
				'step': 'step-e',
			}
		] 
	},
	'step-d': {
		name: 'step-d',
	},
	'step-e': {
		name: 'step-e',
	},
	'step-f': {
		name: 'step-f',
		branches: [ 
			{
				'flow': 'flow-a',
				'step': 'step-b',
			},
			{
				'flow': 'flow-c',
				'step': 'step-g',
			}
		] 
	},
	'step-g': {
		name: 'step-g',
	},
} );

const journeySteps =  createReducer(
	[],
	{
		[ PROTOTYPE_JOURNEY_STEP_ADD ]: ( state, { step } ) =>
			uniq( [ ...state, step ] ),
		[ PROTOTYPE_JOURNEY_STEP_REMOVE ]: ( state, { step } ) =>
			without( state, step ),
		[ PROTOTYPE_START_FLOW ]: ( state, action ) =>
			[ get( flows, [ action.flow, 'steps', '0' ] ) ],
	},
);

const currentFlow =  createReducer(
	'',
	{
		[ PROTOTYPE_GO_TO_STEP ]: ( state, action ) =>
			action.flow ? action.flow : state,
		[ PROTOTYPE_START_FLOW ]: ( state, action ) =>
			action.flow ? action.flow : state,
	},
);

const currentStep =  createReducer(
	'',
	{
		[ PROTOTYPE_GO_TO_STEP ]: ( state, action ) =>
			action.step ? action.step : state,
		[ PROTOTYPE_START_FLOW ]: ( state, action ) =>
			action.flow ? get( flows, [ action.flow, 'steps', '0' ] ) : state,
	},
);

// if for some mad reason a step was repeated, should it be prefilled - 
// this is important because it could mean an array is the way forward.


// onSwitchFlow = () => {
// 	// on starting a journey, we must start with a flow.
// 	// create 
// 	// cap off the current steps 
// 	// [ a, b ]
// 	// and prefil the next 
// }


export default combineReducers( {
	journeySteps,
	currentStep,
	currentFlow,
} )
