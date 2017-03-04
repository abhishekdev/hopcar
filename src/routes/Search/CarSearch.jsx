import React, {Component} from 'react';
import Spinkit from 'react-spinkit';
import $ from 'jquery';
import {settings as api, helpers} from '../../utils/hotwire';

const propTypes = {
    children: React.PropTypes.node
};

const defaultProps = {
    children: []
};

const contextTypes = {
    router: React.PropTypes.object
};

let xdr;

class CarSearch extends Component {
    constructor() {
        super();

        const dateRange = helpers.getInitialRentalRange();

        this.state = {
            limits: {
                dateRangeStart: dateRange.start,
                dateRangeEnd: dateRange.end
            },
            query: {
                dest: 'LAX',
                startdate: dateRange.start,
                enddate: dateRange.start.clone().add(1, 'days'),
                pickuptime: '12:00',
                dropofftime: '12:00'
            },
            results: null,
            isLoading: false,
            apiError: false
        };
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleQueryChange(newQuery) {
        const query = this.state.query;
        const updatedQuery = Object.assign(query, newQuery);
        this.setState({query: updatedQuery});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {query} = this.state;
        // format moments as MM/DD/YY
        const flattenedQuery = Object.assign({}, query, {
            startdate: query.startdate.format('L'),
            enddate: query.enddate.format('L')
        });
        this.searchHotwire(flattenedQuery);
        this.context.router.push('/search');
    }

    searchHotwire(query) {
        xdr && xdr.abort();

        this.setState({
            minimode: true,
            isLoading: true,
            apiError: false
        });

        // FIXME: Avoid using JSONP, use a valid CORS request instead
        xdr = $.ajax({
            url: [api.searchBaseURL, 'car'].join('/'),
            dataType: 'jsonp',
            crossDomain: true,
            data: Object.assign(api.queryParams, query)
        });

        xdr.done((data, status) => {
            this.setState({
                isLoading: false,
                apiError: false,
                results: data
            });
        });

        xdr.fail((xhr, status, err) => {
            this.setState({
                isLoading: false,
                apiError: true,
                results: {}
            });
        });
    }

    render() {
        let results;
        let loader;

        // Initialize loader
        if (this.state.isLoading) {
            loader = (
                <div className="search__pagecurtain">
                    <div className="search__loader">
                        <Spinkit spinnerName="wordpress" />
                        Searching deals...
                    </div>
                </div>
            );
        }

        if (this.props.children) {
            results = (
                <div className="search-resultslist">
                    {this.props.children && React.cloneElement(this.props.children, {
                        data: Object.assign({}, this.state.results)
                    })}
                </div>
            );
        }

        return (
            <div>
                <button onClick={this.handleSubmit}>Test</button>
                <div className="search-results">
                    {loader}
                    {results}
                </div>
            </div>
        );
    }
}

CarSearch.contextTypes = contextTypes;
CarSearch.defaultProps = defaultProps;
CarSearch.propTypes = propTypes;

export default CarSearch;
