/** @format */

/**
 * External dependencies
 */

import { Component } from '@wordpress/element';

class ChartSave extends Component {
	render = () => {
		const { attributes } = this.props;
		const { align } = attributes;
		const alignClassName = align ? `align${ align }` : null;
		return <div className={ alignClassName } />;
	};
}

export default ChartSave;
