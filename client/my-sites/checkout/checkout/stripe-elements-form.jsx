/** @format */

/**
 * External dependencies
 */
import { overSome } from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	injectStripe,
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement,
} from 'react-stripe-elements';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import CheckoutTerms from './checkout-terms';
import { isWpComBusinessPlan, isWpComEcommercePlan } from 'lib/plans';
import PaymentChatButton from './payment-chat-button';
import SubscriptionText from './subscription-text';
import PaymentCountrySelect from 'components/payment-country-select';
import { setPayment, setStripeObject } from 'lib/upgrades/actions';
import { paymentMethodClassName } from 'lib/cart-values';

// TODO: this needs to be moved to TransactionFlow
// async function handleStripeAction( stripe, stripeResponse, orderId, redirectTo ) {
// 	const { error } = await stripe.handleCardPayment( stripeResponse.payment_intent_client_secret );
//
// 	if ( error ) {
// 		// Note that this is a promise rejection
// 		throw new Error( error.message );
// 	}
// 	const origin = getLocationOrigin( window.location );
// 	const redirectPath = redirectTo().replace( ':receiptId', '' );
// 	page( origin + redirectPath + 'pending/' + orderId );
// }

const StripeElementsForm = function( {
	translate,
	stripe,
	cart,
	children,
	countriesList,
	onSubmit,
	presaleChatAvailable,
} ) {
	// TODO: allow disabling the payment button during processing or when not ready
	const [ cardholderName, setCardholderName ] = useState( '' );
	const onNameChange = event => setCardholderName( event.target.value );
	const [ postalCode, setPostalCode ] = useState( '' );
	const onPostalCodeChange = event => setPostalCode( event.target.value );

	const [ country, setCountry ] = useState( { name: null, countryCode: null } );
	const updateCountry = ( name, countryCode ) => setCountry( { name, countryCode } );

	const handleSubmit = event => {
		event.preventDefault();
		// send the `stripe` object to the TransitionStore because it has the
		// stripe elements data (eg: cc number) in its state.
		setStripeObject( stripe );
		setPayment( {
			paymentMethod: paymentMethodClassName( 'stripe' ),
			newCardDetails: {
				name: cardholderName,
				country: country.countryCode,
				'postal-code': postalCode,
			},
		} );
		// All the above actions use the Flux Dispatcher so they are deferred. This
		// defers the submit so it will occur after they take effect.
		setTimeout( () => onSubmit(), 0 );
	};
	const cardholderNameLabel = translate( 'Cardholder Name {{span}}(as written on card){{/span}}', {
		comment: 'Cardholder name label on credit card form',
		components: {
			// eslint-disable-next-line wpcalypso/jsx-classname-namespace
			span: <span className="credit-card-form-fields__explainer" />,
		},
	} );
	const cvcLabel = translate( 'Security Code {{span}}("CVC" or "CVV"){{/span}}', {
		components: {
			// eslint-disable-next-line wpcalypso/jsx-classname-namespace
			span: <span className="credit-card-form-fields__explainer" />,
		},
	} );
	const payButtonLabel = translate( 'Pay %(price)s', {
		args: {
			price: cart.total_cost_display,
		},
		context: 'Pay button on /checkout',
	} );
	const hasBusinessPlanInCart = cart.products.some( ( { product_slug } ) =>
		overSome( isWpComBusinessPlan, isWpComEcommercePlan )( product_slug )
	);
	const showPaymentChatButton = presaleChatAvailable && hasBusinessPlanInCart;

	/* eslint-disable jsx-a11y/label-has-associated-control, wpcalypso/jsx-classname-namespace */
	return (
		<form onSubmit={ handleSubmit }>
			<div className="credit-card checkout__payment-box-section is-selected no-stored-cards">
				<div className="checkout__new-card-fields">
					<div className="credit-card-form-fields">
						<div className="credit-card-form-fields__field name">
							<label className="form-label" htmlFor="name">
								{ cardholderNameLabel }
							</label>
							<input
								name="name"
								type="text"
								placeholder="Jane Doe"
								value={ cardholderName }
								onChange={ onNameChange }
								required
							/>
						</div>
						<div className="credit-card-form-fields__field number">
							<label className="form-label">
								{ translate( 'Card Number' ) }
								<CardNumberElement className="stripe-elements-payment-box__element" />
							</label>
						</div>
						<div className="credit-card-form-fields__extras">
							<div className="credit-card-form-fields__field expiration-date">
								<label className="form-label">
									{ translate( 'Expiry Date' ) }
									<CardExpiryElement className="stripe-elements-payment-box__element" />
								</label>
							</div>
							<div className="credit-card-form-fields__field cvv">
								<label className="form-label">
									{ cvcLabel }
									<CardCVCElement className="stripe-elements-payment-box__element" />
								</label>
							</div>
							<div className="credit-card-form-fields__field country">
								<PaymentCountrySelect
									name="country"
									label={ translate( 'Country', { textOnly: true } ) }
									countriesList={ countriesList }
									onCountrySelected={ updateCountry }
									eventFormName="Checkout Form"
								/>
							</div>
							<div className="credit-card-form-fields__field postal-code">
								<label className="form-label" htmlFor="postal-code">
									{ translate( 'Postal Code' ) }
								</label>
								<input
									name="postal-code"
									type="text"
									value={ postalCode }
									onChange={ onPostalCodeChange }
									required
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{ children }

			<CheckoutTerms cart={ cart } />

			<div className="checkout__payment-box-actions">
				<div className="checkout__payment-box-buttons">
					<span className="checkout__pay-button">
						<button type="submit" className="checkout__pay-button-button button is-primary ">
							{ payButtonLabel }
						</button>
						<SubscriptionText cart={ cart } />
					</span>

					<div className="checkout__secure-payment">
						<div className="checkout__secure-payment-content">
							<Gridicon icon="lock" />
							{ translate( 'Secure Payment' ) }
						</div>
					</div>

					{ showPaymentChatButton && <PaymentChatButton paymentType="stripe" cart={ cart } /> }
				</div>
			</div>
		</form>
	);
	/* eslint-enable jsx-a11y/label-has-associated-control */
};

StripeElementsForm.propTypes = {
	translate: PropTypes.func.isRequired,
	stripe: PropTypes.object,
	cart: PropTypes.object.isRequired,
	countriesList: PropTypes.array.isRequired,
	onSubmit: PropTypes.func.isRequired,
	presaleChatAvailable: PropTypes.bool.isRequired,
};

export { StripeElementsForm };

const InjectedStripeElementsForm = injectStripe( StripeElementsForm );
export default InjectedStripeElementsForm;
