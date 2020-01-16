import React from 'react';
import { configure, addDecorator } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Client, Provider } from '../src';

const client = new Client( {
	clientID: '39911',
	clientSecret: 'cOaYKdrkgXz8xY7aysv4fU6wL6sK5J8a6ojReEIAPwggsznj4Cb6mW0nffTxtYT8',
} );

addDecorator( storyFn => <Provider client={ client }>{ storyFn() }</Provider> );

configure( require.context( '../src', true, /\.stories\.[jt]sx?$/ ), module );
