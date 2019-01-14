/** @format */

/**
 * External dependencies
 */
import { Path, SVG } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { settings as chartSettings } from './settings.js';
import edit from './edit';
import save from './save';
import './style.scss';
import './editor.scss';

export const { name } = chartSettings;

export const icon = (
	<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<Path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
		<Path fill="none" d="M0 0h24v24H0z" />
	</SVG>
);

export const settings = {
	title: chartSettings.title,
	icon: icon,
	category: chartSettings.category,
	keywords: chartSettings.keywords,
	description: chartSettings.description,
	attributes: chartSettings.attributes,
	supports: chartSettings.supports,
	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( -1 !== chartSettings.validAlignments.indexOf( align ) ) {
			return { 'data-align': align };
		}
	},
	edit,
	save,
};
