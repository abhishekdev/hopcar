import React from 'react';
import {ErrorMessage} from '../../components/Layout';

const error = {
    text: 'Page Not Found',
    stack: [{
        ErrorCode: '404',
        ErrorMessage: 'Sorry, but the page you were trying to view does not exist.'
    }]
};

export default () => (
    <ErrorMessage
        className="pagenotfound"
        scope="page"
        error={error}
    />
);
