import React, {PureComponent} from 'react';

/**
 * Valid rental times for picking or returning a car.
 * Starts every half hour from 00:00. i.e. 00:00, 00:30, 1:00 ...so on until... 23:00, 23:30
 * @type {Array<string>}
 */
const TIMESLOTS = [...Array(48)].map((val, i) => {
    let H = i / 2;
    let m = 0;

    if (i % 2) {
        H = (i - 1) / 2;
        m = 30;
    }

    // Pad Hours and minuts with zeros
    const HH = String(`00${H}`).slice(-2);
    const mm = String(`00${m}`).slice(-2);

    return `${HH}:${mm}`;
});

const createTimeList = (time) => {
    let value = time;

    switch (value) {
        case '00:00':
            value = 'midnight';
            break;
        case '12:00':
            value = 'noon';
            break;
        default:
            // default already set
    }

    return (
        <option value={time} key={time}>
            {value}
        </option>
    );
};

const defaultProps = {
    onChange: () => {},
    label: '',
    selected: '12:00'
};

const propTypes = {
    onChange: React.PropTypes.func,
    selected: React.PropTypes.string,
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string
};

class TimePicker extends PureComponent {
    render() {
        const {selected, id, label} = this.props;
        const timeoptions = TIMESLOTS.map(createTimeList);

        return (
            <label htmlFor={id} className="field">
                <span>{label}</span>
                <div className="input-dropdown">
                    <select id={id} value={selected} onChange={this.props.onChange}>
                        {timeoptions}
                    </select>
                </div>
            </label>
        );
    }
}

TimePicker.defaultProps = defaultProps;
TimePicker.propTypes = propTypes;

export default TimePicker;
