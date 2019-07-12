/** @format */

/**
 * External dependencies
 */
import debugFactory from 'debug';
import page from 'page';

const debug = debugFactory( 'calypso:stripe' );

/**
 * Internal dependencies
 */
import { getLocationOrigin } from 'lib/cart-values';

/**
 * Create a Stripe PaymentMethod using Stripe Elements
 *
 * paymentDetails should include data not gathered by Stripe Elements. For
 * example, `name` (string), `address` (object with `country` [string] and
 * `postal_code` [string]).
 *
 * @param {object} stripe The stripe object with payment data included
 * @param {object} paymentDetails The `billing_details` field of the `createPaymentMethod()` request
 * @return {Promise} Promise that will be resolved or rejected
 */
export async function createStripePaymentMethod( stripe, paymentDetails ) {
	debug( 'creating payment method...', paymentDetails );
	const { paymentMethod, error } = await stripe.createPaymentMethod( 'card', {
		billing_details: paymentDetails,
	} );
	debug( 'payment method creation complete', paymentMethod, error );
	if ( error ) {
		// Note that this is a promise rejection
		throw new Error( error.message );
	}
	return paymentMethod;
}

// TODO: this needs to be called in TransactionFlow
export async function handleStripeAction( stripe, stripeResponse, orderId, redirectTo ) {
	const { error } = await stripe.handleCardPayment( stripeResponse.payment_intent_client_secret );

	if ( error ) {
		// Note that this is a promise rejection
		throw new Error( error.message );
	}
	const origin = getLocationOrigin( window.location );
	const redirectPath = redirectTo().replace( ':receiptId', '' );
	page( origin + redirectPath + 'pending/' + orderId );
}
