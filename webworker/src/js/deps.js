var { window, document, localStorage, location, defaultView } = WorkerGlobalScope.self;

/**
 * Dependencies for components
 */

import React from 'react';
import ReactDOM from 'react-dom';

self.React = React;
self.ReactDOM = ReactDOM;
// self.window = self;