import moment from 'moment';
import $ from 'jquery';
import hotwire from './settings';

/**
 * Get hotwire car image URI based on the car type code
 * @param  {string} code CarTypeCode in API response
 * @return {{ImageURL: string}} Hotwire CDN URI for the car image
 */
const getCarImage = (code) => {
    const createImage = imgName => ({ImageURL: `${hotwire.imageBaseURL}${imgName}`});

    switch (code) {
        case 'ECAR':
            return createImage('econ.png');
        case 'CCAR':
            return createImage('compact.png');
        case 'FCAR':
            return createImage('FullSize.png');
        case 'FFAR' || 'FRAR':
            return createImage('FullSize_SUV.png');
        case 'ICAR':
            return createImage('Midsize.png');
        case 'IFAR':
            return createImage('Midsize_SUV.png');
        case 'LCAR':
            return createImage('Luxury.png');
        case 'MVAR':
            return createImage('Minivan.png');
        case 'PCAR':
            return createImage('Premium.png');
        case 'SCAR':
            return createImage('Standard.png');
        case 'SFAR':
            return createImage('Standard_SUV_correct.png');
        case 'SPAR':
            return createImage('Pickup.png');
        case 'STAR':
            return createImage('Convertible.png');
        default:
            return createImage('Special.png');
    }
};

const fetchResults = query => $.ajax({
    url: [hotwire.searchBaseURL, 'car'].join('/'),
    // FIXME: Avoid using JSONP, use a valid CORS request instead
    dataType: 'jsonp',
    crossDomain: true,
    data: Object.assign(hotwire.queryParams, query)
});

/**
 * Checks if date within searchable range
 * @param  {moment}  datetime moment instance
 * @return {Boolean}          is date within searchable range
 */
const isRentalDatetimeValid = (datetime) => {
    // Cannot select days before today and after 330 days
    const now = moment();
    const nextXdays = now.clone().add(hotwire.limits.dateRange, 'days');
    let isValid = false;

    if (datetime && datetime.isBetween(now, nextXdays, 'days')) {
        isValid = true;
    }

    return isValid;
};

/**
 * [isRentalDurationValid description]
 * @param  {moment}  start Rental Pickup/start date
 * @param  {moment}  end   Rental Drop/end date
 * @return {Boolean}       [description]
 */
const isRentalDurationValid = (start, end) => {
    // Cannot rent a car for more than 60 days
    const isWithinMaxRange = isRentalDatetimeValid(start) && isRentalDatetimeValid(end);
    const isStartBeforeEnd = start.isBefore(end);
    const maxRentDuration = start.clone().add(hotwire.limits.rentDurationRange, 'days');
    const isValidDuration = end.isBetween(start, maxRentDuration, 'days');

    return isWithinMaxRange && isStartBeforeEnd && isValidDuration;
};

/**
 * Generate a sample rental duration of a day from today
 * @return {{start: moment, end: moment}}
 */
const getInitialRentalRange = () => {
    // book in the next hour, roundoff minutes
    const now = moment().add(1, 'hours').startOf('hour');
    const nextXdays = now.clone().add(hotwire.limits.dateRange, 'days');

    return {start: now, end: nextXdays};
};

/**
 * Get rental duration query in a format comtaible with the backend API
 * @param  {{start: moment, end: moment}} duration [description]
 * @return {{startdate: string, enddate: string, pickuptime: string, dropofftime: string}}
 */
const getRentalDuration = (duration) => {
    const startMoment = moment(duration.start);
    const endMoment = moment(duration.end);

    return {
        startdate: startMoment.format('L'),
        enddate: endMoment.format('L'),
        pickuptime: startMoment.format(hotwire.format.time),
        dropofftime: endMoment.format(hotwire.format.time)
    };
};

export default {
    getCarImage,
    fetchResults,
    isRentalDatetimeValid,
    isRentalDurationValid,
    getRentalDuration,
    getInitialRentalRange
};

export {getCarImage};
export {fetchResults};
export {isRentalDatetimeValid};
export {isRentalDurationValid};
export {getRentalDuration};
export {getInitialRentalRange};
