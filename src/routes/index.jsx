import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Page views
import Home from './Home';
import PageNotFound from './Errors';
import {CarSearch, CarSearchResults} from './Search';

export default(
    <Route path="/" component={Home}>
        <IndexRoute component={CarSearch} />
        <Route component={CarSearch}>
            <Route path="search" component={CarSearchResults} />
        </Route>
        <Route path="*" component={PageNotFound} />
    </Route>
);
