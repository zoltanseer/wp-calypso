/** @format */

/**
 * External dependencies
 */

import { __ } from 'gutenberg/extensions/presets/jetpack/utils/i18n';

export const settings = {
	name: 'chart',
	prefix: 'jetpack',
	title: __( 'Chart' ),
	category: 'jetpack',
	keywords: [ __( 'chart' ), __( 'graph' ), __( 'd3' ) ],
	description: __( 'Create a data visualization from a Google Sheet.' ),
	attributes: {
		align: {
			type: 'string',
		},
	},
	supports: {
		html: false,
	},
	validAlignments: [ 'center', 'wide', 'full' ],
};
