/**
 * External dependencies
 */
import React, { FunctionComponent, useEffect } from 'react';
import classNames from 'classnames';

interface Props {
	label: string;
	hasHighlight?: boolean;
	query?: string;
	onMount: () => void;
	onMouseDown: () => void;
	onMouseOver: () => void;
}

const Item: FunctionComponent< Props > = ( {
	hasHighlight = false,
	label,
	query = '',
	...props
} ) => {
	useEffect( () => {
		this.props.onMount();
	}, [] );

	const handleMouseDown = ( event: React.SyntheticEvent ) => {
		event.stopPropagation();
		event.preventDefault();
		props.onMouseDown();
	};

	const handleMouseOver = () => {
		props.onMouseOver();
	};

	const className = classNames( 'suggestions__item', { 'has-highlight': hasHighlight } );

	const re = new RegExp( '(' + query + ')', 'gi' );

	return (
		<button
			className={ className }
			onMouseDown={ handleMouseDown }
			onFocus={ handleMouseDown }
			onMouseOver={ handleMouseOver }
		>
			{ label.split( re ).map( ( part, i ) => {
				const key = query + i;
				const lowercasePart = part.toLowerCase();
				const spanClass = classNames( 'suggestions__label', {
					'is-emphasized': lowercasePart === query.toLowerCase(),
				} );

				return (
					<span key={ key } className={ spanClass }>
						{ part }
					</span>
				);
			} ) }
		</button>
	);
};

export default Item;
