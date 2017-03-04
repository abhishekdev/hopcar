/*!
 * @license
 * Car Rental UI that queries Hotwire.com's Rental API
 * Copyright © 2017 Abhishek Dev
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
// Import Styles
import 'normalize.css';
import './index.less';
// Import App Routes
import routes from './routes';

// Throw error if the component cannot be mounted
// TODO: Mount app on custom DOM element (widget app)
const appContainer = ((id) => {
    const container = document.getElementById(id);
    if (!container) {
        throw new Error(`Could not resolve App Container ID: "${id}" to mount at`);
    }
    return container;
})('app');

ReactDOM.render(<Router routes={routes} history={browserHistory} />, appContainer);
