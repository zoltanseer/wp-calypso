import React, { Component } from 'react';
import { difference, nth, indexOf, get, includes, map, size } from 'lodash';
import { connect } from 'react-redux';

import { 
    steps as stepsData,
    flows as flowsData,
} from 'state/signup/prototyping/reducer';
import { goToStep, startFlow } from 'state/signup/prototyping/actions';

const stepStyle = {
    backgroundColor: '#fdd',
    padding: '5px',
    margin: '5px',
}
const activeStepStyle = {
    backgroundColor: '#ccf',
    padding: '5px',
    margin: '5px',
}
const Step = ( { step, isInActiveFlow, currentStep } ) => (
    <span
        style={ {
            ...stepStyle,
            ...currentStep === step ? activeStepStyle : {}
        } }
    >
        { step }
    </span>
);

const FlowLabel = ( { flowName, isActiveFlow, ...props } ) => (
    <span
        style={ {
            ...stepStyle,
            ...isActiveFlow ? activeStepStyle : {}
        } }
        { ...props }
    >
        { flowName }
    </span>
);

const StepButton = props => (
    <button
        style={ {
            background: '#ddd',
            margin: '5px',
            padding: '5px',
        } }
        { ...props }
    />
);

class PrototypeMain extends Component {

    state = {};

    componentDidMount() {
        this.props.startFlow( 'flow-a' );
    }

    next = () => {
        const nextStep = this.getNextStep();
        const flowData = this.getCurrentFlowData();

        if ( ! nextStep ) {
            console.log('on the last step currently' );
            return;
        }

        this.props.goToStep( {
            flow: flowData.flowName,
            step: nextStep,
        } );
    }

    prev = () => {
        const previousStep = this.getPreviousStep();
        const flowData = this.getCurrentFlowData();

        if ( ! previousStep ) {
            console.log('on the first step currently' );
            return;
        }

        this.props.goToStep( {
            flow: flowData.flowName,
            step: previousStep,
        } );
    }

    goToStep = ( { flow, step } ) => () =>
        flow && step && this.props.goToStep( { flow, step } );

    getCurrentStepData = () =>
        get( 
            stepsData, 
            this.props.prototypeData.currentStep, 
            {}
        );

    getCurrentFlowData = () =>
        get( 
            flowsData, 
            this.props.prototypeData.currentFlow, 
            {}
        );

    getNextStep = () => {
        const { prototypeData } = this.props;
        const { currentStep, journeySteps } = prototypeData;
        const flowData = this.getCurrentFlowData();
        const stepList = difference( flowData.steps, journeySteps );
        const nextIndex = indexOf( 
            stepList,
            currentStep
        ) + 1;

        return get( stepList, nextIndex );
    }
    getPreviousStep = () => {
        const { prototypeData } = this.props;
        const { currentStep, journeySteps } = prototypeData;

        if (true) {
            return nth( journeySteps, -2 );
            
        }

        const flowData = this.getCurrentFlowData();
        const tagetIndex = indexOf( flowData.steps, currentStep ) - 1;

        return get( flowData, [ 'steps', tagetIndex ] );
    }

    startFlow = flowName => () =>
        console.log( 'startFlow', flowName ) ||
        this.props.startFlow( flowName );

    renderControls = () => {
        const { branches } = this.getCurrentStepData();
        const hasBranches = size( branches );

        const prevStepName = this.getPreviousStep();
        const nextStepName = this.getNextStep();

        return (
            <div>
                <p>
                Prev: <StepButton onClick={ this.prev }>{ prevStepName }</StepButton>
                </p>
                <p>
                Next: { hasBranches 
                    ? (
                       map( branches, ( { flow, step } ) => (
                            <StepButton onClick={ this.goToStep( { flow, step }) }>{ `${flow}:${step}` }</StepButton>
                        ) )
                    ) : (
                        <StepButton onClick={ this.next }>{ nextStepName }</StepButton>
                    )
                }
                </p>
            </div>
        );
    }

    render() {
        const { flowProgress, progress, prototypeData } = this.props;
        const { currentFlow, currentStep, journeySteps } = prototypeData;

        const currentFlowData = this.getCurrentFlowData();
        const currentStepData = this.getCurrentStepData();

        console.log( { currentStep, currentFlow, currentFlowData} );

        return (
          <div style={ { background: '#eee' } }>

            <p>Current flow: { currentFlow }</p>
            { map( flowsData, flow => (
                <FlowLabel 
                    onClick={ this.startFlow( flow.flowName ) }
                    flowName={ flow.flowName }
                    isActiveFlow={ flow.flowName === currentFlow } 
                />
            ) ) }
            <hr />
            { map( currentFlowData.steps, step => (
                <Step 
                    step={ step } 
                    isActiveFlow
                    currentStep={ currentStep }
                />
            ) ) }
            <hr />
            <h4>Journey:</h4>
            { map( journeySteps, step => (
                <Step 
                        step={ step } 
                        isActiveFlow
                        currentStep={ currentStep }
                    />
            ) ) }
            <hr />
            { this.renderControls() }
          </div>
        );
    }
}

export default connect(
    ( state, { flowName } ) => ( {
        prototypeData: get( state, 'signup.prototyping', {} ),
    } ),
    { 
        goToStep, 
        startFlow 
    }
)( PrototypeMain );