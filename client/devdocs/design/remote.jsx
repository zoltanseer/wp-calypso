/** @format */

/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import DocumentHead from 'components/data/document-head';
import Main from 'components/main';

import { upgradeElement } from '@ampproject/worker-dom/dist/debug/main.mjs'; // TODO: use safe version?

class RemoteBlock extends React.Component {
	constructor( props ) {
		super( props );
		this.remoteBlockRef = React.createRef();
	}

	componentDidMount() {
		// let's add a mutation observer for debugging
		var targetNode = this.remoteBlockRef.current; //document.getElementById('upgrade-me');
		console.warn( 'mounted remote block', targetNode );
		var config = { attributes: true, childList: true, subtree: true };

		// Create an observer instance linked to the callback function
		var observer = new MutationObserver( ( mutationsList ) => {
			for ( var mutation of mutationsList ) {
				if ( mutation.type == 'childList' ) {
					console.log( 'A child node has been added or removed.' );
				} else if ( mutation.type == 'attributes' ) {
					console.log( 'The ' + mutation.attributeName + ' attribute was modified.' );
				}
			}
		} );

		// Start observing the target node for configured mutations
		observer.observe( targetNode, config );
		console.warn( 'added mutation observer' );

		// kick off webworker
		// upgradeElement( document.getElementById('upgrade-me'), '/webworker/remote-component.js' );
		upgradeElement( targetNode, 'http://remote.localhost:3000/webworker/js/worker.mjs' );
		console.warn( 'upgraded element' );
	}

	render() {
		//http://goldsounds.ngrok.io/wp-content/plugins/portenblock/build/js/sample-block.js
		console.warn( 'rendering' );
		return (
			<div>
				<h1>Container</h1>
				<div
					src="http://remote.localhost:3000/webworker/js/remote-component-example.js"
					ref={ this.remoteBlockRef }
				>
					This is the block
				</div>
			</div>
		);
	}
}

export default class Remote extends React.PureComponent {
	static displayName = 'Remote';

	render() {
		return (
			<Main className="devdocs design__remote devdocs__remote">
				<DocumentHead title="Remote" />

				<div className="design__remote-content devdocs__doc-content">
					<h1>Remote</h1>
					<p>This demonstrates safely loading a UI component from a third-party domain by using a WebWorker.</p>
					<p>This allows us to sanitize access to in-page resources such as cookies</p>
					<RemoteBlock />
				</div>
			</Main>
		);
	}
}
