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
import userFactory from '../../lib/user';
/**
 * Style dependencies
 */
import 'assets/stylesheets/gutenboarding.scss';
import 'components/environment-badge/style.scss';
import { UserData } from '../../lib/user/user';

function generateGetSuperProps( userData: UserData | undefined ) {
	const site_count = userData ? userData.site_count : 0;
	return () => ( {
		environment: process.env.NODE_ENV,
		environment_id: config( 'env_id' ),
		site_id_label: 'wpcom',
		client: config( 'client_slug' ),
		site_count,
	} );
}

window.AppBoot = () => {
	if ( ! config.isEnabled( 'gutenboarding' ) ) {
		window.location.href = '/';
	} else {
		setupWpDataDebug();
		const userData = userFactory().get();

		initializeAnalytics( userData, generateGetSuperProps( userData ) );
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
