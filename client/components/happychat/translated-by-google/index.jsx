/** @format */

/**
 * External dependencies
 */
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { assign, isArray, isEmpty } from 'lodash';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import GoogleLogo from 'components/google-logo-svg';

const Container = styled.div`
`;

const GoogleLogoContainer = styled.span`
	display: inline-block;
    height: 1.2em;
    width: auto;
    display: flex;
    padding-top: 0.2em;

    svg {
    	width: auto;
    }
`;

const Message = styled.span`
	justify-content: center;
    display: flex;
    align-items: center;
    color: #666;
    padding: 8px;
`;

const StyledP = styled.p`
    display: inline-block;
    margin: 0;

`;

const TranslatedByGoogle = () => (
	<Container >
		<Message><StyledP>Translated by</StyledP>&nbsp;<GoogleLogoContainer><GoogleLogo /></GoogleLogoContainer></Message>
	</Container>
);

export default TranslatedByGoogle;