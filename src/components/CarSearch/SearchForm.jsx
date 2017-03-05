import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import Geosuggest from 'react-geosuggest';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InfiniteCalendar, {Calendar, withRange} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import ModalCalendar from './ModalCalendar';
import TimeField from './TimePicker';

// const RangePicker = DatePicker.RangePicker;
const defaultProps = {
    className: '',
    onChange: () => {},
    onSubmit: () => {}
};
const propTypes = {
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    className: React.PropTypes.string,
    limits: React.PropTypes.shape({
        dateRangeStart: momentPropTypes.momentObj.isRequired,
        dateRangeEnd: momentPropTypes.momentObj.isRequired
    }).isRequired,
    query: React.PropTypes.shape({
        dest: React.PropTypes.string.isRequired,
        startdate: momentPropTypes.momentObj.isRequired,
        enddate: momentPropTypes.momentObj.isRequired,
        pickuptime: React.PropTypes.string.isRequired,
        dropofftime: React.PropTypes.string.isRequired
    }).isRequired
};

class SearchForm extends Component {
    constructor() {
        super();
        this.state = {
            showMobileDatepicker: false
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleLocationSelect = this.handleLocationSelect.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.toggleMobileDatepicker = this.toggleMobileDatepicker.bind(this);
        this.handleMobileDateSelect = this.handleMobileDateSelect.bind(this);
        this.handlePickupDateChange = this.handlePickupDateChange.bind(this);
        this.handleDropOffDateChange = this.handleDropOffDateChange.bind(this);
    }

    handleOnChange(event) {
        const elem = event.target;
        this.props.onChange({
            [elem.id]: elem.value
        });
    }

    toggleMobileDatepicker() {
        const showMobileDatepicker = !(this.state.showMobileDatepicker);
        this.setState({
            showMobileDatepicker
        });
        this.searchButton.focus();
    }

    handleMobileDateSelect(ui) {
        if (ui.eventType === 3) {
            this.props.onChange({
                startdate: moment(ui.start),
                enddate: moment(ui.end)
            });
        }
    }

    handleDateChange(newDate) {
        let {startdate, enddate} = Object.assign({}, this.props.query, newDate);

        if (startdate.isAfter(enddate)) {
            const temp = startdate;
            startdate = enddate;
            enddate = temp;
        }

        this.props.onChange({
            startdate,
            enddate
        });
    }

    handlePickupDateChange(startdate) {
        this.handleDateChange({startdate});
        return false;
    }

    handleDropOffDateChange(enddate) {
        this.handleDateChange({enddate});
    }

    handleLocationSelect(suggest) {
        this.props.onChange({
            dest: suggest.label
        });
    }

    handleLocationChange(value) {
        this.props.onChange({
            dest: value
        });
    }

    render() {
        const {query, limits} = this.props;


        return (
            <div className={this.props.className}>
                <form onSubmit={this.props.onSubmit} className="searchform">
                    <fieldset className="fieldset">
                        <legend>Search for Rental Cars</legend>
                        <label htmlFor="dest" className="field">
                            <span>
                                <span className="oi" data-glyph="map-marker" />
                                Pickup Location
                            </span>
                            <Geosuggest
                                id="dest"
                                className="pickupfield"
                                initialValue={query.dest}
                                placeholder="Enter address, city, zip or airport"
                                onChange={this.handleLocationChange}
                                onSuggestSelect={this.handleLocationSelect}
                            />
                        </label>
                        <MediaQuery maxWidth={600} className="datetime__wrapper">
                            <div className="datetime__group">
                                <label htmlFor="pickupdate" className="field">
                                    <span>Pickup Date</span>
                                    <input
                                        id="pickupdate"
                                        type="text"
                                        onFocus={this.toggleMobileDatepicker}
                                        value={query.startdate.format('L')}
                                        readOnly
                                    />
                                </label>
                                <TimeField
                                    id="pickuptime"
                                    label="Pickup Time"
                                    selected={query.pickuptime}
                                    onChange={this.handleOnChange}
                                />
                            </div>
                            <div className="datetime__group">
                                <label htmlFor="dropoffdate" className="field">
                                    <span>Dropoff Date</span>
                                    <input
                                        id="dropoffdate"
                                        type="text"
                                        value={query.enddate.format('L')}
                                        onFocus={this.toggleMobileDatepicker}
                                        readOnly
                                    />
                                </label>
                                <TimeField
                                    id="dropofftime"
                                    label="Dropoff Time"
                                    selected={query.dropofftime}
                                    onChange={this.handleOnChange}
                                />
                            </div>
                            <ModalCalendar
                                heading="Select Dates"
                                closeLabel="Done"
                                visible={this.state.showMobileDatepicker}
                                onClose={this.toggleMobileDatepicker}
                            >
                                <InfiniteCalendar
                                    min={limits.dateRangeStart.toDate()}
                                    max={limits.dateRangeEnd.toDate()}
                                    Component={withRange(Calendar)}
                                    minDate={limits.dateRangeStart.toDate()}
                                    maxDate={limits.dateRangeEnd.toDate()}
                                    selected={{
                                        start: query.startdate.toDate(),
                                        end: query.enddate.toDate()
                                    }}
                                    className="modal__datepicker"
                                    autoFocus={this.state.showMobileDatepicker}
                                    onSelect={this.handleMobileDateSelect}
                                />
                            </ModalCalendar>
                        </MediaQuery>
                        <MediaQuery minWidth={601} className="datetime__wrapper">
                            <div className="datetime__group">
                                <label htmlFor="pickupdate" className="field">
                                    <span>Pickup Date</span>
                                    <DatePicker
                                        id="pickupdate"
                                        title="Pickup Date"
                                        dateFormat="MM/DD/YYYY"
                                        minDate={limits.dateRangeStart}
                                        maxDate={limits.dateRangeEnd}
                                        startDate={query.startdate}
                                        endDate={query.enddate}
                                        selected={query.startdate}
                                        monthsShown={2}
                                        selectsStart
                                        required
                                        readOnly
                                        onChange={this.handlePickupDateChange}
                                    />
                                </label>
                                <TimeField
                                    id="pickuptime"
                                    label="Pickup Time"
                                    selected={query.pickuptime}
                                    onChange={this.handleOnChange}
                                />
                            </div>
                            <div className="datetime__group">
                                <label htmlFor="dropoffdate" className="field">
                                    <span>Dropoff Date</span>
                                    <DatePicker
                                        id="dropoffdate"
                                        title="Dropoff Date"
                                        dateFormat="MM/DD/YYYY"
                                        className="datepicker"
                                        minDate={limits.dateRangeStart}
                                        maxDate={limits.dateRangeEnd}
                                        startDate={query.startdate}
                                        endDate={query.enddate}
                                        selected={query.enddate}
                                        monthsShown={2}
                                        selectsEnd
                                        required
                                        readOnly
                                        onChange={this.handleDropOffDateChange}
                                    />
                                </label>
                                <TimeField
                                    id="dropofftime"
                                    label="Dropoff Time"
                                    selected={query.dropofftime}
                                    onChange={this.handleOnChange}
                                />
                            </div>
                        </MediaQuery>
                        <div className="buttonbar">
                            <button
                                ref={(el) => { this.searchButton = el; }}
                                type="submit"
                                className="button__primary button__primary--small"
                            >
                                Search
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

SearchForm.defaultProps = defaultProps;
SearchForm.propTypes = propTypes;

export default SearchForm;
