import React, {PureComponent} from 'react';
import Layout from '../../components/Layout';

const propTypes = {
    children: React.PropTypes.node.isRequired
};

class Home extends PureComponent {
    render() {
        return (
            <Layout>
                {this.props.children}
            </Layout>
        );
    }
}

Home.propTypes = propTypes;

export default Home;
