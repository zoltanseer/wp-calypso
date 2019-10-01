/** @format */

/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

/**
 * Internal dependencies
 */
import { abtest } from 'lib/abtest';
import config from 'config';
import ECommerceManageNudge from 'blocks/ecommerce-manage-nudge';
import { getDecoratedSiteDomains } from 'state/sites/domains/selectors';
import GoogleMyBusinessStatsNudge from 'blocks/google-my-business-stats-nudge';
import GSuiteStatsNudge from 'blocks/gsuite-stats-nudge';
import isGoogleMyBusinessStatsNudgeVisibleSelector from 'state/selectors/is-google-my-business-stats-nudge-visible';
import isGSuiteStatsNudgeVisible from 'state/selectors/is-gsuite-stats-nudge-visible';
import isUpworkStatsNudgeDismissed from 'state/selectors/is-upwork-stats-nudge-dismissed';
import canCurrentUserUseCustomerHome from 'state/sites/selectors/can-current-user-use-customer-home';
import QuerySiteDomains from 'components/data/query-site-domains';
import UpworkStatsNudge from 'blocks/upwork-stats-nudge';
import WpcomChecklist from 'my-sites/checklist/wpcom-checklist';

class StatsBanners extends Component {
	static propTypes = {
		domains: PropTypes.array.isRequired,
		isCustomerHomeEnabled: PropTypes.bool.isRequired,
		isGoogleMyBusinessStatsNudgeVisible: PropTypes.bool.isRequired,
		isGSuiteStatsNudgeVisible: PropTypes.bool.isRequired,
		isUpworkStatsNudgeVisible: PropTypes.bool.isRequired,
		siteId: PropTypes.number.isRequired,
		slug: PropTypes.string.isRequired,
	};

	shouldComponentUpdate( nextProps ) {
		return (
			this.props.isGoogleMyBusinessStatsNudgeVisible !==
				nextProps.isGoogleMyBusinessStatsNudgeVisible ||
			this.props.isGSuiteStatsNudgeVisible !== nextProps.isGSuiteStatsNudgeVisible ||
			this.props.isUpworkStatsNudgeVisible !== nextProps.isUpworkStatsNudgeVisible ||
			this.props.domains.length !== nextProps.domains.length
		);
	}

	renderBanner() {
		if ( this.showUpworkBanner() ) {
			return this.renderUpworkBanner();
		} else if ( this.showGSuiteBanner() ) {
			return this.renderGSuiteBanner();
		} else if ( this.showGoogleMyBusinessBanner() ) {
			return this.renderGoogleMyBusinessBanner();
		}
	}

	renderGoogleMyBusinessBanner() {
		const { isGoogleMyBusinessStatsNudgeVisible, siteId, slug } = this.props;

		return (
			<GoogleMyBusinessStatsNudge
				siteSlug={ slug }
				siteId={ siteId }
				visible={ isGoogleMyBusinessStatsNudgeVisible }
			/>
		);
	}

	renderGSuiteBanner() {
		const { siteId, slug } = this.props;

		return <GSuiteStatsNudge siteSlug={ slug } siteId={ siteId } />;
	}

	renderUpworkBanner() {
		const { siteId, slug } = this.props;

		return <UpworkStatsNudge siteSlug={ slug } siteId={ siteId } />;
	}

	showGoogleMyBusinessBanner() {
		return (
			config.isEnabled( 'google-my-business' ) && this.props.isGoogleMyBusinessStatsNudgeVisible
		);
	}

	showGSuiteBanner() {
		return this.props.isGSuiteStatsNudgeVisible;
	}

	showUpworkBanner() {
		return (
			abtest( 'builderReferralStatsNudge' ) === 'builderReferralBanner' &&
			this.props.isUpworkStatsNudgeVisible
		);
	}

	render() {
		const { isCustomerHomeEnabled, planSlug, siteId } = this.props;

		if ( ! this.props.domains.length ) {
			return null;
		}

		return (
			<Fragment>
				{ siteId && <QuerySiteDomains siteId={ siteId } /> }

				{ /* Hide `WpcomChecklist` on the Customer Home because the checklist is displayed on the page. */ }
				{ 'ecommerce-bundle' !== planSlug && ! isCustomerHomeEnabled && (
					<WpcomChecklist viewMode="banner" />
				) }

				{ 'ecommerce-bundle' === planSlug && <ECommerceManageNudge siteId={ siteId } /> }

				{ this.renderBanner() }
			</Fragment>
		);
	}
}

export default connect( ( state, ownProps ) => {
	return {
		domains: getDecoratedSiteDomains( state, ownProps.siteId ),
		isGoogleMyBusinessStatsNudgeVisible: isGoogleMyBusinessStatsNudgeVisibleSelector(
			state,
			ownProps.siteId
		),
		isGSuiteStatsNudgeVisible: isGSuiteStatsNudgeVisible( state, ownProps.siteId ),
		isUpworkStatsNudgeVisible: ! isUpworkStatsNudgeDismissed( state, ownProps.siteId ),
		isCustomerHomeEnabled: canCurrentUserUseCustomerHome( state, ownProps.siteId ),
	};
} )( localize( StatsBanners ) );
