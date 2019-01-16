/** @format */

/**
 * External dependencies
 */

import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/editor';

class ChartSave extends Component {
	render = () => {
		const { attributes } = this.props;
		const {
			align,
			colors,
			chartType,
			googleSheetURL,
			numberFormat,
			chartTitle,
			xAxisLabel,
			yAxisLabel,
		} = attributes;
		const alignClassName = align ? `align${ align }` : null;
		return (
			<div
				className={ alignClassName }
				data-google-sheet-url={ googleSheetURL }
				data-x-axis-label={ xAxisLabel }
				data-y-axis-label={ yAxisLabel }
				data-chart-type={ chartType }
				data-number-format={ numberFormat }
				data-colors={ JSON.stringify( colors ) }
				data-align={ align }
			>
				<RichText.Content tagName="p" className="chart-title" value={ chartTitle } />
			</div>
		);
	};
}

export default ChartSave;
