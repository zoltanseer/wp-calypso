/**
 * External dependencies
 */
import React from 'react';
import '@wordpress/components/build-style/style.css';
import { BaseControl, TextControl, TextareaControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { Wrapper } from './index.styles';

export interface FormProps {
	url: string;
	file: string;
	title: string;
	caption: string;
	alt: string;
	description: string;
	onChange: ( fields: {} ) => void;
}

export const Form = ( { url, file, title, caption, alt, description, onChange } ) => {
	const [ fields, setFields ] = React.useState( {
		title,
		caption,
		alt,
		description,
	} );

	const handleFieldChange = ( fieldName: string ) => ( fieldValue: string ) => {
		setFields( s => ( {
			...s,
			[ fieldName ]: fieldValue,
		} ) );
		// TODO: debounce
		onChange( fields );
	};

	return (
		<Wrapper>
			<TextControl label="Title" value={ fields.title } onChange={ handleFieldChange( 'title' ) } />

			<TextareaControl
				label="Caption"
				value={ fields.caption }
				onChange={ handleFieldChange( 'caption' ) }
			/>

			<TextControl label="Alt text" value={ fields.alt } onChange={ handleFieldChange( 'alt' ) } />

			<TextareaControl
				label="Description"
				value={ fields.description }
				onChange={ handleFieldChange( 'description' ) }
			/>

			<TextControl
				label="URL"
				value={ url }
				onChange={ () => {
					/* do nothing */
				} }
			/>

			<BaseControl id="" label="File name">
				{ file }
			</BaseControl>

			<BaseControl id="" label="File type">
				{ file }
			</BaseControl>

			<BaseControl id="" label="Dimensions">
				{ file }
			</BaseControl>

			<BaseControl id="" label="Upload date">
				{ file }
			</BaseControl>
		</Wrapper>
	);
};
