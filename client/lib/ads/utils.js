/** @format */

/**
 * Internal dependencies
 */

import { userCan } from 'lib/site/utils';
import { isBusiness, isPremium, isEcommerce } from 'lib/products-values';
import { isEnabled } from 'config';

/**
 * Returns true if the site has WordAds access
 * @param  {Site} site Site object
 * @return {boolean}      true if site has WordAds access
 */
export function canAccessWordads( site ) {
	if ( site ) {
		if ( isWordadsInstantActivationEligible( site ) ) {
			return true;
		}
		const jetpackPremium =
			site.jetpack &&
			( isPremium( site.plan ) || isBusiness( site.plan ) || isEcommerce( site.plan ) );
		return (
			site.options &&
			( site.options.wordads ||
				jetpackPremium ||
				( site.jetpack && isEnabled( 'wordads/enable-jetpack-free-signup' ) ) ) &&
			userCan( 'manage_options', site )
		);
	}

	return false;
}

export function jetpackFreeSignupEligible( site ) {
	return site.jetpack && isEnabled( 'wordads/enable-jetpack-free-signup' );
}
export function canAccessAds( site ) {
	return (
		( canAccessWordads( site ) || canUpgradeToUseWordAds( site ) ) &&
		userCan( 'manage_options', site )
	);
}

export function isWordadsInstantActivationEligible( site ) {
	if (
		( isPremium( site.plan ) || isBusiness( site.plan ) || isEcommerce( site.plan ) ) &&
		userCan( 'activate_wordads', site )
	) {
		return true;
	}

	return false;
}

export function canUpgradeToUseWordAds( site ) {
	if (
		site &&
		! site.options.wordads &&
		! isBusiness( site.plan ) &&
		! isPremium( site.plan ) &&
		! isEcommerce( site.plan )
	) {
		return true;
	}

	return false;
}
