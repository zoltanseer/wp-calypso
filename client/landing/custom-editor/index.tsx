/**
 * External dependencies
 */
import '@automattic/calypso-polyfills';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import config from '../../config';

/**
 * Internal dependencies
 */
import CustomEditor from './editor';
// import { setupWpDataDebug } from './devtools'; // Currently only available in Gutenboarding
import accessibleFocus from 'lib/accessible-focus';
/**
 * Style dependencies
 */
import 'assets/stylesheets/gutenboarding.scss';
import 'components/environment-badge/style.scss';

window.AppBoot = () => {
	if ( ! config.isEnabled( 'gutenboarding' ) ) {
		window.location.href = '/';
	} else {
		// setupWpDataDebug();

		// Add accessible-focus listener.
		accessibleFocus();

		ReactDom.render(
			<BrowserRouter basename="custom-editor">
				<CustomEditor />
			</BrowserRouter>,
			document.getElementById( 'wpcom' )
		);
	}
};
