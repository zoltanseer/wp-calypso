// import React from 'react';
// import ReactDOM from 'react-dom';

// importScripts( './react.js' );
// importScripts( 'http://remote.localhost:3000/webworker/js/react.js' );

// attempt to share the true "self" instance and WorkerDOM instance since
// WorkerDOM itself wraps this code in a self-executing function that overrides
// `self`

var trueSelf = WorkerGlobalScope.self;

// WorkerGlobalScope.self.WorkerThread = WorkerThread;

// var self = this;
trueSelf.window = this;
trueSelf.document = this.document;
trueSelf.localStorage = this.localStorage;
trueSelf.location = this.location;
trueSelf.defaultView = document.defaultView;
trueSelf.Node = defaultView.Node;
trueSelf.Text = defaultView.Text;
trueSelf.Element = defaultView.Element;
trueSelf.HTMLElement = defaultView.HTMLElement;
trueSelf.SVGElement = defaultView.SVGElement;
trueSelf.Document = defaultView.Document;
trueSelf.Event = defaultView.Event;
trueSelf.MutationObserver = defaultView.MutationObserver;

// this defines self.React and self.ReactDOM
importScripts( 'http://remote.localhost:3000/webworker/js/deps.js' );


// console.warn("I am a block with raw DOM", document);

// why is this in a setTimeout?
// because: https://github.com/ampproject/worker-dom/issues/10
// function createExampleNode( titleText ) {
// 	const h1 = document.createElement('h1');
// 	const title = document.createTextNode(titleText);
// 	h1.appendChild( title )
// 	document.body.appendChild( h1 );
// }
// createExampleNode('hello world on worker boot');
// setTimeout(() => {
// 	createExampleNode('hello world from setTimeout');
// }, 100);

console.log("no problemo");

class App extends React.Component {
	render() {
		return <h1>Rendered</h1>;
	}
}
const div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(<App />, div);
