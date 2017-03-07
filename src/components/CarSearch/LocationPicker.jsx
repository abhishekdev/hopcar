import React, {Component} from 'react';
import cx from 'classnames';
import Geosuggest from 'react-geosuggest';

const defaultProps = {
    labelName: '',
    validationMessage: '',
    isInvalid: false
};

const propTypes = {
    id: React.PropTypes.string.isRequired,
    labelName: React.PropTypes.string,
    validationMessage: React.PropTypes.string,
    isInvalid: React.PropTypes.bool
};

class LocationPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: true,
            wobbleDone: false
        };
        this.wobbleDone = this.wobbleDone.bind(this);
    }

    componentDidMount() {
        const elem = this.field;
        elem.addEventListener('animationend', this.wobbleDone);
    }

    componentWillUnmount() {
        const elem = this.field;
        elem.removeEventListener('animationend', this.wobbleDone);
    }

    wobbleDone() {
        // remove wobble animation so it can be reapplied later
        this.field.classList.remove('wobble');
    }

    render() {
        return (
            <label htmlFor={this.props.id} className="field">
                <span>
                    <span className="oi" data-glyph="map-marker" />
                    {this.props.isInvalid ? this.props.validationMessage : this.props.labelName}
                </span>
                <div
                    ref={(el) => { this.field = el; }}
                    className={cx('locationPicker', {isInvalid: this.props.isInvalid, wobble: this.props.isInvalid})}
                >
                    <Geosuggest {...this.props} />
                </div>
            </label>
        );
    }
}

LocationPicker.defaultProps = defaultProps;
LocationPicker.propTypes = propTypes;

export default LocationPicker;
