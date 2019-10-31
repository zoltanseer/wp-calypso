/**
 * Internal dependencies
 */
import config from 'config';
import debug from './debug';
import doNotTrack from './do-not-track';
import isPiiUrl from './is-pii-url';
import mayWeTrackCurrentUserGdpr from './may-we-track-current-user-gdpr';

// For better load performance, these routes are blacklisted from loading ads.
const blacklistedRoutes = [ '/log-in' ];

/**
 * Are tracking pixels forbidden from the current URL for better performance (except for Google Analytics)?
 *
 * @returns {Boolean} true if the current URL is blacklisted.
 */
function isUrlBlacklistedForPerformance() {
	const { href } = document.location;
	const result = blacklistedRoutes.some( pattern => href.startsWith( pattern ) );

	debug( `Is URL Blacklisted for Performance: ${ result }` );
	return result;
}

/**
 * Returns whether ad tracking is allowed.
 *
 * This function returns false if:
 *
 * 1. 'ad-tracking' is disabled
 * 2. `Do Not Track` is enabled
 * 3. the current user could be in the GDPR zone and hasn't consented to tracking
 * 4. `document.location.href` may contain personally identifiable information
 *
 * @returns {Boolean} Is ad tracking is allowed?
 */
export default function isAdTrackingAllowed() {
	const result =
		config.isEnabled( 'ad-tracking' ) &&
		! doNotTrack() &&
		! isUrlBlacklistedForPerformance() &&
		! isPiiUrl() &&
		mayWeTrackCurrentUserGdpr();
	debug( `isAdTrackingAllowed: ${ result }` );
	return result;
}
