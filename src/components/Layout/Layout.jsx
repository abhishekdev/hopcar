import React, {PureComponent} from 'react';
import Masthead from './Masthead';

const propTypes = {
    children: React.PropTypes.node.isRequired
};

class Layout extends PureComponent {
    render() {
        return (
            <div className="hopcar">
                <Masthead companyname="Hopcar" />
                <main className="app-page">
                    {this.props.children}
                </main>
            </div>
        );
    }
}

Layout.propTypes = propTypes;

export default Layout;
