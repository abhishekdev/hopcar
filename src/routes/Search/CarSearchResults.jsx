import React, {PureComponent} from 'react';
import {ErrorMessage} from '../../components/Layout';
import {Carlist} from '../../components/CarSearch';

const defaultProps = {
    data: {
        StatusCode: 'initial'
    }
};

const propTypes = {
    data: React.PropTypes.shape({
        Errors: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.object
        ]),
        MetaData: React.PropTypes.shape({
            CarMetaData: React.PropTypes.shape({
                CarTypes: React.PropTypes.array
            })
        }),
        Result: React.PropTypes.array,
        StatusCode: React.PropTypes.string,
        StatusDesc: React.PropTypes.string
    })
};

class CarSearchResults extends PureComponent {
    render() {
        const {data} = this.props;

        let error;
        let content = null;

        if (data.StatusCode === 'netError') {
            error = {
                text: 'Whoops! We hit a roadblock while searching.',
                stack: [
                    {
                        ErrorCode: 'xhrError',
                        ErrorMessage: 'Please check your connection and re-try'
                    }
                ]
            };
            content = <ErrorMessage error={error} />;
        } else if (data.StatusCode && data.StatusCode !== '0') {
            error = {
                text: data.StatusDesc,
                stack: typeof data.Errors === 'object'
                    ? [Object.assign({}, data.Errors.Error)]
                    : [...data.Errors]
            };
            content = <ErrorMessage error={error} />;
        } else if (data.Result && data.Result.length) {
            content = <Carlist list={[...data.Result]} carTypes={[...data.MetaData.CarMetaData.CarTypes]} />;
        }

        return content;
    }
}

CarSearchResults.defaultProps = defaultProps;
CarSearchResults.propTypes = propTypes;

export default CarSearchResults;
