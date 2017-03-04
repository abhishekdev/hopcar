import React from 'react';
import {Route} from 'react-router';

// Page views
import Home from './Home';
import PageNotFound from './Errors';

export default(
    <Route path="/" component={Home}>
        <Route path="*" component={PageNotFound} />
    </Route>
);
