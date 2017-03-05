import React, {PureComponent} from 'react';
import momentPropTypes from 'react-moment-proptypes';

const propTypes = {
    onEditQuery: React.PropTypes.func.isRequired,
    query: React.PropTypes.shape({
        dest: React.PropTypes.string.isRequired,
        startdate: momentPropTypes.momentObj.isRequired,
        enddate: momentPropTypes.momentObj.isRequired,
        pickuptime: React.PropTypes.string.isRequired,
        dropofftime: React.PropTypes.string.isRequired
    }).isRequired
};

class QuerySummary extends PureComponent {
    render() {
        const {dest, pickuptime, dropofftime, startdate, enddate} = this.props.query;

        const pickupDate = startdate.clone();
        const dropoffDate = enddate.clone();
        const pickupTime = pickuptime.split(':').map(frag => Number(frag));
        const dropoffTime = dropofftime.split(':').map(frag => Number(frag));
        pickupDate.hours(pickupTime[0]).minutes(pickupTime[1]);
        dropoffDate.hours(dropoffTime[0]).minutes(dropoffTime[1]);

        return (
            <div className="searchquery--mini">
                <button type="button" className="searchform__toggle" onClick={this.props.onEditQuery}>
                    edit
                </button>
                <div className="destination">{dest}</div>
                <div className="dates">
                    {`${pickupDate.format('ddd, MMMM D YYYY, h:mm a')} - ${dropoffDate.format('ddd, MMMM D YYYY, h:mm a')}`}
                </div>
            </div>
        );
    }
}

QuerySummary.propTypes = propTypes;

export default QuerySummary;
