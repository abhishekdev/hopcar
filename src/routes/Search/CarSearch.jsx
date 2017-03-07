import React, {Component} from 'react';
import Spinkit from 'react-spinkit';
import cx from 'classnames';
import {helpers} from '../../utils/hotwire';
import {SearchForm, QuerySummary} from '../../components/CarSearch';

const propTypes = {
    children: React.PropTypes.node
};

const defaultProps = {
    children: []
};

const contextTypes = {
    router: React.PropTypes.object
};

// Promise for the Cross Domain Request;
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
                dest: '',
                startdate: dateRange.start,
                enddate: dateRange.start.clone().add(1, 'days'),
                pickuptime: '12:00',
                dropofftime: '12:00'
            },
            results: null,
            minimode: false,
            isLoading: false,
            apiError: false
        };
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleMinimode = this.toggleMinimode.bind(this);
    }

    handleQueryChange(newQuery) {
        const query = this.state.query;
        const updatedQuery = Object.assign(query, newQuery);
        this.setState({query: updatedQuery});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {query} = this.state;
        // format moments as mm/dd/yy
        const flattenedQuery = Object.assign({}, query, {
            startdate: query.startdate.format('L'),
            enddate: query.enddate.format('L')
        });
        this.searchHotwire(flattenedQuery);
        this.context.router.push('/search');
    }

    toggleMinimode() {
        this.setState({
            minimode: !this.state.minimode
        });
    }

    searchHotwire(query) {
        xdr && xdr.abort();

        // Switch to loading state
        this.setState({
            minimode: false,
            isLoading: true,
            apiError: false
        });

        xdr = helpers.fetchResults(query);

        // Success: Handle API response
        xdr.done((data, status) => {
            this.setState({
                minimode: true,
                isLoading: false,
                apiError: false,
                results: data
            });
        });

        // Fail: Show network communication error message
        xdr.fail((xhr, status, err) => {
            this.setState({
                isLoading: false,
                apiError: true,
                results: {
                    StatusCode: 'netError'
                }
            });
        });
    }

    render() {
        let results;
        let loader;
        let querySummary;
        const searchFormClass = cx('searchform__wrapper', {
            'searchform__wrapper--minimized': this.state.minimode
        });

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

        if (this.state.minimode) {
            querySummary = (
                <QuerySummary
                    onEditQuery={this.toggleMinimode}
                    query={Object.assign({}, this.state.query)}
                />
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
                <SearchForm
                    className={searchFormClass}
                    query={Object.assign({}, this.state.query)}
                    limits={Object.assign({}, this.state.limits)}
                    onSubmit={this.handleSubmit}
                    onChange={this.handleQueryChange}
                />
                <div className="search-results">
                    {querySummary}
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
