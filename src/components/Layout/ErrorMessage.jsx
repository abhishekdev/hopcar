import React, {PureComponent} from 'react';
import cx from 'classnames';

const defaultProps = {
    scope: 'content',
    className: ''
};

const propTypes = {
    scope: React.PropTypes.oneOf(['page', 'content']),
    className: React.PropTypes.string,
    error: React.PropTypes.shape({
        text: React.PropTypes.string,
        stack: React.PropTypes.array
    }).isRequired
};

class ErrorMessage extends PureComponent {
    render() {
        const {error, className, scope} = this.props;
        const containerCssClasslist = cx('errorMsg', className, {
            'is-pageError': scope.toLowerCase() === 'page'
        });
        const errorContent = error.stack.map(err => <p className="content" key={err.ErrorCode}>{err.ErrorMessage}</p>);

        return (
            <div className={containerCssClasslist}>
                <section className="container">
                    <h1 className="title">{error.text}</h1>
                    {errorContent}
                </section>
            </div>
        );
    }
}

ErrorMessage.defaultProps = defaultProps;
ErrorMessage.propTypes = propTypes;

export default ErrorMessage;
