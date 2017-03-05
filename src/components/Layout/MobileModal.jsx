import React, {PropTypes, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

const defaultProps = {
    visible: false,
    fullpage: true,
    heading: '',
    closeLabel: 'Close',
    children: []
};

const propTypes = {
    visible: PropTypes.bool,
    fullpage: PropTypes.bool,
    heading: PropTypes.string,
    closeLabel: PropTypes.string,
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

class MobileModal extends PureComponent {

    constructor() {
        super();
        this.state = {
            width: 0,
            height: 0
        };
        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    componentDidMount() {
        this.popup = document.createElement('div');
        this.popup.classList.add('hopcar', 'preload');
        document.body.appendChild(this.popup);
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
        this.renderLayer();
    }

    componentDidUpdate() {
        this.popup.classList.remove('preload');
        this.renderLayer();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        ReactDOM.unmountComponentAtNode(this.popup);
        document.body.removeChild(this.popup);
    }

    handleWindowResize() {
        this.setState({
            width: parseInt(window.innerWidth, 10),
            height: parseInt(window.innerHeight, 10)
        });
    }

    renderLayer() {
        const containerClassnames = cx({
            'modal--fullpage': this.props.fullpage,
            'modal--hidden': !this.props.visible,
            'modal--visible': this.props.visible
        });

        // NOTE: Use aria-label (vs. araia-labelledby) so there is no dependency on HTML ID
        ReactDOM.render((
            <section
                className={containerClassnames}
                role="dialog"
                aria-hidden={!this.props.visible}
                aria-label={this.props.heading}
            >
                <div className="modal__titlebar">
                    <h1 className="title">{this.props.heading}</h1>
                    <button className="close-button" onClick={this.props.onClose}>{this.props.closeLabel}</button>
                </div>
                <div className="modal__content">
                    {this.props.children && React.cloneElement(this.props.children, {
                        width: this.state.width,
                        height: this.state.height
                    })}
                </div>
            </section>
        ), this.popup);
    }

    render() {
        return null;
    }
}

MobileModal.defaultProps = defaultProps;
MobileModal.propTypes = propTypes;

export default MobileModal;
