/** @format */

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import { getDecoratedSiteDomains } from 'state/sites/domains/selectors';
import { getEmailForwards } from 'state/selectors/get-email-forwards';
import { getGSuiteSupportedDomains } from 'lib/gsuite';
import isGSuiteStatsNudgeDismissed from 'state/selectors/is-gsuite-stats-nudge-dismissed';

function hasDomainEligibleForNudge( state, domains ) {
	const supportedDomains = getGSuiteSupportedDomains( domains );

	const eligibleDomains = supportedDomains.filter( ( domain ) => {
		const emailForwards = getEmailForwards( state, domain.name );

		return isEmpty( emailForwards );
	} );

	return ! isEmpty( eligibleDomains );
}

export default function isGSuiteStatsNudgeVisible( state, siteId ) {
	const isStatsNudgeDismissed = isGSuiteStatsNudgeDismissed( state, siteId );

	if ( isStatsNudgeDismissed ) {
		return false;
	}

	const domains = getDecoratedSiteDomains( state, siteId );

	if ( ! domains ) {
		return false;
	}

	return domains && hasDomainEligibleForNudge( state, domains );
}
