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

// TODO: move this to somewhere else
const stripeJsUrl = 'https://js.stripe.com/v3/';

function useStripeJs( url, apiKey ) {
	const [ stripeJs, setStripeJs ] = useState( null );
	useEffect( () => {
		if ( ! apiKey ) {
			return;
		}
		if ( window.Stripe ) {
			debug( 'stripe.js already loaded' );
			setStripeJs( window.Stripe( apiKey ) );
			return;
		}
		debug( 'loading stripe.js...' );
		loadScript( url, function( error ) {
			if ( error ) {
				debug( 'stripe.js script ' + error.src + ' failed to load.' );
				return;
			}
			debug( 'stripe.js loaded!' );
			setStripeJs( window.Stripe( apiKey ) );
		} );
	}, [ url, apiKey ] );
	return stripeJs;
}

function useStripeApiKey( country ) {
	const [ stripeApiKey, setStripeApiKey ] = useState();
	useEffect( () => {
		getStripeConfiguration( { country } ).then( apiKey => setStripeApiKey( apiKey ) );
	}, [ country ] );
	return stripeApiKey;
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
	// TODO: send the country to useStripeApiKey
	const stripeApiKey = useStripeApiKey();
	const stripeJs = useStripeJs( stripeJsUrl, stripeApiKey );
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
