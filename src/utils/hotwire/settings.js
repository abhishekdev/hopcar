/**
 * Hotwire API properties and helper methods
 * @type {Object}
 */
const HOTWIRE_API = {
    searchBaseURL: 'https://api.hotwire.com/v1/search',
    imageBaseURL: 'https://ak-secure.hotwirestatic.com/y/static/images/car/cartypes/289x137/US/',
    queryParams: {
        format: 'jsonp',
        apikey: 's6qy7hnhn2q6d5hpa9hpjf5y'
    },
    limits: {
        // Rental car can be booked upto 330 days in future from the current date.
        dateRange: 330,
        // maximum rental duration of 60 days.
        rentDurationRange: 60,
        // Pickup/Drop-off times are every half hour from 00:00 hrs. 00:00, 00:30, 1:00 ...so on util...23:00, 23:30
        // 30 mins = 1800 secs
        timeSteps: 1800
    },
    format: {
        date: 'MM/DD/YYYY', // e.g. 12/31/2017
        time: 'HH:mm' // e.g. 00:00, 23:59
    }
};

export default HOTWIRE_API;
