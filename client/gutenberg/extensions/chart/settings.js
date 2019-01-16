/** @format */

/**
 * External dependencies
 */

import { __ } from 'gutenberg/extensions/presets/jetpack/utils/i18n';

const defaultGoogleSheetURL =
	'https://docs.google.com/spreadsheets/d/1Ta7QDLsMGTC6vW03DnkvtQ5AE4IY1IeHnrFX7_7PZPE/pubhtml';

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
		chartTitle: {
			type: 'string',
		},
		chartType: {
			type: 'string',
			default: 'area-spline',
		},
		colors: {
			type: 'array',
			default: [],
		},
		googleSheetURL: {
			type: 'string',
			default: defaultGoogleSheetURL,
		},
		numberFormat: {
			type: 'string',
			default: 'none',
		},
		xAxisLabel: {
			type: 'string',
			default: '',
		},
		yAxisLabel: {
			type: 'string',
			default: '',
		},
	},
	chartTypeOptions: [
		{
			value: 'bar',
			label: __( 'Bar' ),
		},
		{
			value: 'line',
			label: __( 'Line' ),
		},
		{
			value: 'area',
			label: __( 'Area' ),
		},
		{
			value: 'spline',
			label: __( 'Spline' ),
		},
		{
			value: 'area-spline',
			label: __( 'Area-spline' ),
		},
		{
			value: 'scatter',
			label: __( 'Scatter' ),
		},
		{
			value: 'step',
			label: __( 'Step' ),
		},
		{
			value: 'area-step',
			label: __( 'Area-step' ),
		},
		{
			value: 'pie',
			label: __( 'Pie' ),
		},
		{
			value: 'donut',
			label: __( 'Donut' ),
		},
	],
	numberFormatOptions: [
		{
			value: 'none',
			label: __( 'None' ),
		},
		{
			value: 'dollar',
			label: __( '$' ),
		},
		{
			value: 'euro',
			label: __( '€' ),
		},
		{
			value: 'pound',
			label: __( '£' ),
		},
		{
			value: 'percent',
			label: __( '%' ),
		},
	],
	allColors: [
		'#1f77b4',
		'#aec7e8',
		'#ff7f0e',
		'#ffbb78',
		'#2ca02c',
		'#98df8a',
		'#d62728',
		'#ff9896',
		'#9467bd',
		'#c5b0d5',
		'#8c564b',
		'#c49c94',
		'#e377c2',
		'#f7b6d2',
		'#7f7f7f',
		'#c7c7c7',
		'#bcbd22',
		'#dbdb8d',
		'#17becf',
		'#9edae5',
	],
	supports: {
		html: false,
	},
	validAlignments: [ 'center', 'wide', 'full' ],
};
