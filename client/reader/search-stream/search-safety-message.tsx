/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */

export class SearchSafetyMessage extends Component {
	static propTypes = {
		query: PropTypes.string.isRequired,
	};

	render() {
		if ( this.props.query !== 'anti-vaxx' ) {
			return null;
		}

		return <div>{ 'hold on, be aware of this' }</div>;
	}
}

export default SearchSafetyMessage;
