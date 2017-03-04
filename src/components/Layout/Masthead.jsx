import React, {PureComponent} from 'react';
import {Link} from 'react-router';

class Masthead extends PureComponent {
    render() {
        return (
            <header className="masthead">
                <h1>
                    <Link to="/">{this.props.companyname}</Link>
                </h1>
            </header>
        );
    }
}

Masthead.propTypes = {
    companyname: React.PropTypes.string.isRequired
};

export default Masthead;
