/**
 * External dependencies
 */
import '@automattic/calypso-polyfills';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import config from '../../config';
import { initializeAnalytics } from '@automattic/calypso-analytics';

/**
 * Internal dependencies
 */
import { Gutenboard } from './gutenboard';
import { setupWpDataDebug } from './devtools';
import accessibleFocus from 'lib/accessible-focus';
/**
 * Style dependencies
 */
import 'assets/stylesheets/gutenboarding.scss';
import 'components/environment-badge/style.scss';

function generateGetSuperProps() {
	return () => ( {
		environment: process.env.NODE_ENV,
		environment_id: config( 'env_id' ),
		site_id_label: 'wpcom',
		client: config( 'client_slug' ),
	} );
}

window.AppBoot = () => {
	if ( ! config.isEnabled( 'gutenboarding' ) ) {
		window.location.href = '/';
	} else {
		setupWpDataDebug();
		// User is left undefined here because the user account will not be created
		// until after the user has completed the gutenboarding flow.
		// This also saves us from having to pull in lib/user/user and it's dependencies.
		initializeAnalytics( undefined, generateGetSuperProps() );
		// Add accessible-focus listener.
		accessibleFocus();

		ReactDom.render(
			<BrowserRouter basename="gutenboarding">
				<Gutenboard />
			</BrowserRouter>,
			document.getElementById( 'wpcom' )
		);
	}
};
