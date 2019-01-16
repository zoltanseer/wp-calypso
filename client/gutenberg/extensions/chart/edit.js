/** @format */

/**
 * External dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { TextControl, SelectControl } from '@wordpress/components';
import {
	BlockAlignmentToolbar,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/editor';
import { __ } from 'gutenberg/extensions/presets/jetpack/utils/i18n';

/**
 * Internal dependencies
 */
import Chart from './component.js';
import { settings as chartSettings } from './settings.js';

class ChartEdit extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			rowsForColors: [],
		};
	}
	onUpdateColors = rows => {
		const { attributes, setAttributes } = this.props;
		const newColors = attributes.colors.slice( 0 );
		rows.forEach( ( row, index ) => {
			if ( ! newColors[ index ] ) {
				newColors[ index ] = chartSettings.allColors[ index ];
			}
		} );
		if ( newColors !== attributes.colors ) {
			setAttributes( { colors: newColors } );
		}
		this.setState( { rowsForColors: rows } );
	};
	updateColorForRow = ( color, index ) => {
		const { attributes, setAttributes } = this.props;
		const newColors = attributes.colors.slice( 0 );
		newColors[ index ] = color;
		setAttributes( { colors: newColors } );
	};
	render = () => {
		const { className, setAttributes, attributes } = this.props;
		const {
			align,
			colors,
			chartTitle,
			chartType,
			googleSheetURL,
			numberFormat,
			xAxisLabel,
			yAxisLabel,
		} = attributes;
		const { rowsForColors } = this.state;
		const colorControl = rowsForColors.map( ( point, index ) => {
			return (
				<PanelColorSettings
					title={ __( 'Color: ' + point[ 0 ] ) }
					initialOpen={ true }
					key={ index }
					colorSettings={ [
						{
							value: colors[ index ],
							onChange: value => this.updateColorForRow( value, index ),
							label: 'X Axis Color',
						},
					] }
				/>
			);
		} );
		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ value => setAttributes( { align: value } ) }
						controls={ chartSettings.validAlignments }
					/>
				</BlockControls>
				<InspectorControls>
					<p>
						Create a spreadsheet with Google Sheets,
						<a
							href="https://support.google.com/docs/answer/37579?hl=en"
							target="_blank"
							rel="noopener noreferrer"
						>
							publish it
						</a>
						, and paste the <strong>Share</strong> URL here. The spreadsheet’s format should
						resemble{' '}
						<a
							href="https://docs.google.com/a/atavist.net/spreadsheets/d/1Ta7QDLsMGTC6vW03DnkvtQ5AE4IY1IeHnrFX7_7PZPE/pubhtml"
							target="_blank"
							rel="noopener noreferrer"
						>
							this example
						</a>
						.
					</p>
					<TextControl
						label={ __( 'Google Sheets URL' ) }
						value={ googleSheetURL }
						onChange={ value => setAttributes( { googleSheetURL: value } ) }
					/>
					<SelectControl
						label={ __( 'Chart type' ) }
						value={ chartType }
						options={ chartSettings.chartTypeOptions }
						onChange={ value => setAttributes( { chartType: value } ) }
					/>
					<TextControl
						label={ __( 'X Axis Label' ) }
						placeholder={ __( 'Type a label…' ) }
						value={ xAxisLabel }
						onChange={ value => setAttributes( { xAxisLabel: value } ) }
					/>
					<TextControl
						label={ __( 'Y Axis Label' ) }
						placeholder={ __( 'Type a label…' ) }
						value={ yAxisLabel }
						onChange={ value => setAttributes( { yAxisLabel: value } ) }
					/>
					<SelectControl
						label={ __( 'Number format' ) }
						value={ numberFormat }
						options={ chartSettings.numberFormatOptions }
						onChange={ value => setAttributes( { numberFormat: value } ) }
					/>
					{ colorControl }
				</InspectorControls>
				<div className={ className }>
					<Chart
						chartType={ chartType }
						googleSheetURL={ googleSheetURL }
						numberFormat={ numberFormat }
						xAxisLabel={ xAxisLabel }
						yAxisLabel={ yAxisLabel }
						colors={ colors }
						admin={ true }
						align={ align }
						onUpdateColors={ this.onUpdateColors }
					>
						<RichText
							className="chart-title"
							placeholder={ __( 'Write a chart title…', 'jetpack' ) }
							tagName="p"
							value={ chartTitle }
							onChange={ value => setAttributes( { chartTitle: value } ) }
						/>
					</Chart>
				</div>
			</Fragment>
		);
	};
}

export default ChartEdit;
