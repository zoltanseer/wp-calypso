/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import classNames from 'classnames';

interface Props {
	label: string;
	hasHighlight?: boolean;
	query?: string;
	onMount: () => void;
	onMouseDown: () => void;
	onMouseOver: () => void;
}

class Item extends PureComponent< Props > {
	static defaultProps = {
		hasHighlight: false,
		query: '',
	};

	componentDidMount() {
		this.props.onMount();
	}

	/**
	 * Highlights the part of the text that matches the query.
	 * @param  {string} text  Text.
	 * @param  {string} query The text to be matched.
	 * @returns {element}      A React element including the highlighted text.
	 */
	createTextWithHighlight( text, query ) {
		const re = new RegExp( '(' + query + ')', 'gi' );
		const parts = text.split( re );

		return parts.map( ( part, i ) => {
			const key = text + i;
			const lowercasePart = part.toLowerCase();
			const spanClass = classNames( 'suggestions__label', {
				'is-emphasized': lowercasePart === query.toLowerCase(),
			} );

			return (
				<span key={ key } className={ spanClass }>
					{ part }
				</span>
			);
		} );
	}

	handleMouseDown = event => {
		event.stopPropagation();
		event.preventDefault();
		this.props.onMouseDown();
	};

	handleMouseOver = () => {
		this.props.onMouseOver();
	};

	render() {
		const { hasHighlight, label, query } = this.props;

		const className = classNames( 'suggestions__item', { 'has-highlight': hasHighlight } );

		return (
			<button
				className={ className }
				onMouseDown={ this.handleMouseDown }
				onFocus={ this.handleMouseDown }
				onMouseOver={ this.handleMouseOver }
			>
				{ this.createTextWithHighlight( label, query ) }
			</button>
		);
	}
}

export default Item;
