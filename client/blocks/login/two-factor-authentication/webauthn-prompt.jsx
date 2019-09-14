/**
 * External dependencies
 */
import { connect } from 'react-redux';
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import { recordTracksEventWithClientId as recordTracksEvent } from 'state/analytics/actions';
import { getTwoFactorAuthRequestError } from 'state/login/selectors';
import { localize } from 'i18n-calypso';

/**
 * Style dependencies
 */
import './verification-code-form.scss';
import { loginUserWithHardwareKey } from 'state/login/actions';

class WebauthnPrompt extends Component {
	componentDidMount() {
		this.props.loginUserWithHardwareKey();
	}

	componentDidUpdate( prevProps ) {}

	componentWillReceiveProps = nextProps => {};

	render() {
		//const { translate } = this.props;

		return (
			<Card compact className="two-factor-authentication__webauthn-prompt">
				🤝
			</Card>
		);
	}
}

export default connect(
	state => ( {
		twoFactorAuthRequestError: getTwoFactorAuthRequestError( state ),
	} ),
	{
		recordTracksEvent,
		loginUserWithHardwareKey,
	}
)( localize( WebauthnPrompt ) );
