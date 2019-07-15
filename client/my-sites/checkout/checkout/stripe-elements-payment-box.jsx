/** @format */

/**
 * External dependencies
 */
import { loadScript } from '@automattic/load-script';
import debugFactory from 'debug';
import React, { useEffect, useState } from 'react';
import { localize } from 'i18n-calypso';
import { StripeProvider, Elements } from 'react-stripe-elements';

/**
 * Internal dependencies
 */
import InjectedStripeElementsForm from './stripe-elements-form';
import { getStripeConfiguration } from 'lib/store-transactions';

const debug = debugFactory( 'calypso:stripe-elements-payment-box' );

function useStripeJs( stripeConfig ) {
	const [ stripeJs, setStripeJs ] = useState( null );
	useEffect( () => {
		if ( ! stripeConfig ) {
			return;
		}
		if ( window.Stripe ) {
			debug( 'stripe.js already loaded' );
			setStripeJs( window.Stripe( stripeConfig.public_key ) );
			return;
		}
		debug( 'loading stripe.js...' );
		loadScript( stripeConfig.js_url, function( error ) {
			if ( error ) {
				debug( 'stripe.js script ' + error.src + ' failed to load.' );
				return;
			}
			debug( 'stripe.js loaded!' );
			setStripeJs( window.Stripe( stripeConfig.public_key ) );
		} );
	}, [ stripeConfig ] );
	return stripeJs;
}

function useStripeConfiguration( country ) {
	const [ stripeConfiguration, setStripeConfiguration ] = useState();
	useEffect( () => {
		getStripeConfiguration( { country } ).then( configuration =>
			setStripeConfiguration( configuration )
		);
	}, [ country ] );
	return stripeConfiguration;
}

export function StripeElementsPaymentBox( {
	translate,
	cart,
	children,
	selectedSite,
	countriesList,
	onSubmit,
	transaction,
	presaleChatAvailable,
} ) {
	// TODO: send the country to useStripeConfiguration
	const stripeConfiguration = useStripeConfiguration();
	const stripeJs = useStripeJs( stripeConfiguration );
	return (
		<StripeProvider stripe={ stripeJs }>
			<Elements>
				<InjectedStripeElementsForm
					translate={ translate }
					cart={ cart }
					transaction={ transaction }
					onSubmit={ onSubmit }
					selectedSite={ selectedSite }
					countriesList={ countriesList }
					presaleChatAvailable={ presaleChatAvailable }
				>
					{ children }
				</InjectedStripeElementsForm>
			</Elements>
		</StripeProvider>
	);
}

export default localize( StripeElementsPaymentBox );
