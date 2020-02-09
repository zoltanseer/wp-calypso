/**
 * External dependencies
 */
import React from 'react';
import { Form } from './form';

/**
 * Internal dependencies
 */
import { Wrapper, Preview } from './index.styles';
import { useItem } from '../..';

export interface DetailProps {
	siteId: string;
	itemId: string;
}

export const Detail: React.FC< DetailProps > = ( { siteId, itemId } ) => {
	const [ status, item, error ] = useItem( siteId, itemId );
	return (
		<Wrapper>
			<Preview>Preview</Preview>
			<Form
				{ ...item }
				onChange={ () => {
					/* do nothing */
				} }
			/>
		</Wrapper>
	);
};
