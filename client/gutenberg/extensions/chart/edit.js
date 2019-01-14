/** @format */

/**
 * External dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { BlockAlignmentToolbar, BlockControls } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import Chart from './component.js';

class ChartEdit extends Component {
	constructor() {
		super( ...arguments );
	}
	updateAlignment = value => {
		this.props.setAttributes( { align: value } );
	};
	render = () => {
		const { className, setAttributes, attributes } = this.props;
		const { align } = attributes;
		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ value => setAttributes( { align: value } ) }
						controls={ [ 'center', 'wide', 'full' ] }
					/>
				</BlockControls>
				<div className={ className }>
					<Chart />
				</div>
			</Fragment>
		);
	};
}

export default ChartEdit;
