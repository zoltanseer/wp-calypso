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
import { getStripeConfiguration } from 'lib/store-transactions';
import InjectedStripeCreditCardPaymentBox from './credit-card-payment-box';

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
	initialCard,
	countriesList,
	onSubmit,
	transaction,
	presaleChatAvailable,
	cards,
} ) {
	// TODO: send the country to useStripeConfiguration
	const stripeConfiguration = useStripeConfiguration( InjectedStripeCreditCardPaymentBox );
	const stripeJs = useStripeJs( stripeConfiguration );
	return (
		<StripeProvider stripe={ stripeJs }>
			<Elements>
				<InjectedStripeCreditCardPaymentBox
					translate={ translate }
					cards={ cards }
					transaction={ transaction }
					cart={ cart }
					countriesList={ countriesList }
					initialCard={ initialCard }
					selectedSite={ selectedSite }
					onSubmit={ onSubmit }
					transactionStep={ transaction.step }
					presaleChatAvailable={ presaleChatAvailable }
				>
					{ children }
				</InjectedStripeCreditCardPaymentBox>
			</Elements>
		</StripeProvider>
	);
}
export default localize( StripeElementsPaymentBox );
