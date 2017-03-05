import React, {Component} from 'react';
import cx from 'classnames';

const propTypes = {
    type: React.PropTypes.shape({
        TypicalSeating: React.PropTypes.string,
        CarTypeName: React.PropTypes.string,
        CarTypeCode: React.PropTypes.string,
        PossibleFeatures: React.PropTypes.string,
        PossibleModels: React.PropTypes.string
    }).isRequired,
    CurrencyCode: React.PropTypes.string,
    DeepLink: React.PropTypes.string,
    SubTotal: React.PropTypes.string,
    TaxesAndFees: React.PropTypes.string,
    TotalPrice: React.PropTypes.string,
    DailyRate: React.PropTypes.string,
    // DropoffDay: React.PropTypes.string,
    // DropoffTime: React.PropTypes.string,
    // PickupDay: React.PropTypes.string,
    // PickupTime: React.PropTypes.string,
    LocationDescription: React.PropTypes.string,
    MileageDescription: React.PropTypes.string,
    // PickupAirport: React.PropTypes.string,
    RentalDays: React.PropTypes.string
    // VendorLocationId: React.PropTypes.string,
    // TypicalSeating: React.PropTypes.string,
    // CarTypeName: React.PropTypes.string,
    // PossibleFeatures: React.PropTypes.string,
    // PossibleModels: React.PropTypes.string
};

const defaultProps = {
    CurrencyCode: '',
    DeepLink: '',
    ResultId: '',
    HWRefNumber: '',
    SubTotal: '',
    TaxesAndFees: '',
    TotalPrice: '',
    CarTypeCode: '',
    DailyRate: '',
    DropoffDay: '',
    DropoffTime: '',
    PickupDay: '',
    PickupTime: '',
    LocationDescription: '',
    MileageDescription: '',
    PickupAirport: '',
    RentalDays: '',
    VendorLocationId: '',
    TypicalSeating: '',
    CarTypeName: '',
    PossibleFeatures: '',
    PossibleModels: ''
};

class Car extends Component {
    constructor() {
        super();
        this.state = {
            showDetails: false
        };
        this.showRentalDetails = this.showRentalDetails.bind(this);
    }

    showRentalDetails() {
        const currentState = this.state.showDetails;
        this.setState({
            showDetails: !currentState
        });
    }

    render() {
        const {type} = this.props;
        const zoneClassname = cx('zone', {
            flipped: this.state.flipped
        });

        return (
            <div className="card car" tabIndex="0">
                <div className={zoneClassname}>
                    <section className="cardetails">
                        <div className="card-picture">
                            <img
                                alt={type.PossibleModels}
                                aria-hidden="true"
                                className="image"
                                src={type.ImageURL}
                                role="presentation"
                            />
                        </div>
                        <div className="card-content">
                            <h2 className="meta primary">{type.CarTypeName}</h2>
                            <div className="meta">{type.PossibleModels}</div>
                            <div className="meta">{this.props.MileageDescription} miles</div>
                        </div>
                        <div className="badge-content">
                            <span
                                className="price price--perday"
                                title={`${this.props.CurrencyCode} ${this.props.DailyRate} per day`}
                                aria-label={`${this.props.CurrencyCode} ${this.props.DailyRate} per day`}
                            >
                                {this.props.DailyRate}
                            </span>
                        </div>
                        <section className="rentalsummary">
                            <h3 className="summary-title">Summary</h3>
                            <div className="meta">
                                {this.props.LocationDescription}
                            </div>
                            <div className="meta">
                                <span className="label">{this.props.DailyRate} × {this.props.RentalDays} days</span>
                                {' '}
                                <span className="value" aria-label={`equals subtotal ${this.props.SubTotal}`}>
                                    {this.props.SubTotal}
                                </span>
                            </div>
                            <div className="meta">
                                <span className="label">Taxes & Fees</span>
                                {' '}
                                <span className="value">{this.props.TaxesAndFees}</span>
                            </div>
                            <div className="meta primary totalcost">
                                <span className="label">Total</span>
                                {' '}
                                <span className="value">
                                    <span className="currency-code">{this.props.CurrencyCode}</span>
                                    {' '}
                                    <strong className="price">{this.props.TotalPrice}</strong>
                                </span>
                            </div>
                        </section>
                    </section>
                    <a className="action-btn" href={this.props.DeepLink} title="Book at Hotwire">Rent Now</a>
                </div>
            </div>
        );
    }
}

Car.defaultProps = defaultProps;
Car.propTypes = propTypes;

export default Car;
