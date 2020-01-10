/**
 * External dependencies
 */
import React, { PureComponent, ReactElement } from 'react';
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
	 *
	 * @param text  Text.
	 * @param query The text to be matched.
	 */
	createTextWithHighlight(
		text: string,
		query: string
	): Array< ReactElement< JSX.IntrinsicElements[ 'span' ] > > {
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

	handleMouseDown = ( event: React.SyntheticEvent ) => {
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
