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
import { Input } from 'my-sites/domains/components/form';
import {
	BEFORE_SUBMIT,
	INPUT_VALIDATION,
	RECEIVED_PAYMENT_KEY_RESPONSE,
	RECEIVED_WPCOM_RESPONSE,
	REDIRECTING_FOR_AUTHORIZATION,
	MODAL_AUTHORIZATION,
	RECEIVED_AUTHORIZATION_RESPONSE,
	SUBMITTING_PAYMENT_KEY_REQUEST,
	SUBMITTING_WPCOM_REQUEST,
} from 'lib/store-transactions/step-types';

const StripeElementsForm = function( {
	translate,
	stripe,
	cart,
	children,
	countriesList,
	onSubmit,
	transaction,
	presaleChatAvailable,
} ) {
	// TODO: allow disabling the payment when not ready
	const [ cardholderName, setCardholderName ] = useState( '' );
	const onNameChange = event => setCardholderName( event.target.value );

	const [ postalCode, setPostalCode ] = useState( '' );
	const onPostalCodeChange = event => setPostalCode( event.target.value );

	const [ country, setCountry ] = useState( { name: null, countryCode: null } );
	const updateCountry = ( name, countryCode ) => setCountry( { name, countryCode } );

	// From CreditCardPaymentBox.submitting
	const submitting = () => {
		const transactionStep = transaction.step;

		switch ( transactionStep.name ) {
			case BEFORE_SUBMIT:
				return false;

			case INPUT_VALIDATION:
				if ( transactionStep.error ) {
					return false;
				}
				return true;

			case RECEIVED_AUTHORIZATION_RESPONSE:
			case RECEIVED_PAYMENT_KEY_RESPONSE:
				if ( transactionStep.error ) {
					return false;
				}
				return true;

			case SUBMITTING_PAYMENT_KEY_REQUEST:
			case SUBMITTING_WPCOM_REQUEST:
			case REDIRECTING_FOR_AUTHORIZATION:
			case MODAL_AUTHORIZATION:
				return true;

			case RECEIVED_WPCOM_RESPONSE:
				if ( transactionStep.error || ! transactionStep.data.success ) {
					return false;
				}
				return true;

			default:
				return false;
		}
	};

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

	const elementClasses = {
		base: 'credit-card-form-fields__element',
		invalid: 'is-error',
		focus: 'has-focus',
	};

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
							<Input
								name="name"
								type="text"
								placeholder="Jane Doe"
								value={ cardholderName }
								onChange={ onNameChange }
								isError={ !! transaction.errors.name }
								errorMessage={ transaction.errors.name }
							/>
						</div>
						<div className="credit-card-form-fields__field number">
							<label className="form-label">
								{ translate( 'Card Number' ) }
								<CardNumberElement classes={ elementClasses } />
							</label>
						</div>
						<div className="credit-card-form-fields__extras">
							<div className="credit-card-form-fields__field expiration-date">
								<label className="form-label">
									{ translate( 'Expiry Date' ) }
									<CardExpiryElement classes={ elementClasses } />
								</label>
							</div>
							<div className="credit-card-form-fields__field cvv">
								<label className="form-label">
									{ cvcLabel }
									<CardCVCElement classes={ elementClasses } />
								</label>
							</div>
							<div className="credit-card-form-fields__field country">
								<PaymentCountrySelect
									name="country"
									label={ translate( 'Country', { textOnly: true } ) }
									countriesList={ countriesList }
									onCountrySelected={ updateCountry }
									eventFormName="Checkout Form"
									isError={ !! transaction.errors.country }
									errorMessage={ transaction.errors.country }
								/>
							</div>
							<div className="credit-card-form-fields__field postal-code">
								<label className="form-label" htmlFor="postal-code">
									{ translate( 'Postal Code' ) }
								</label>
								<Input
									name="postal-code"
									type="text"
									value={ postalCode }
									onChange={ onPostalCodeChange }
									isError={ !! transaction.errors[ 'postal-code' ] }
									errorMessage={ transaction.errors[ 'postal-code' ] }
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
						<button
							type="submit"
							className="checkout__pay-button-button button is-primary "
							disabled={ submitting() }
						>
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
	transaction: PropTypes.object.isRequired,
	countriesList: PropTypes.array.isRequired,
	onSubmit: PropTypes.func.isRequired,
	presaleChatAvailable: PropTypes.bool.isRequired,
};

export { StripeElementsForm };

const InjectedStripeElementsForm = injectStripe( StripeElementsForm );
export default InjectedStripeElementsForm;
