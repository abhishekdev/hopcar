import React, {PureComponent} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {helpers} from '../../utils/hotwire';
import Car from './Car';

const defaultProps = {
    list: [],
    carTypes: []
};

const propTypes = {
    list: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            CurrencyCode: React.PropTypes.string,
            DeepLink: React.PropTypes.string,
            ResultId: React.PropTypes.string,
            HWRefNumber: React.PropTypes.string,
            SubTotal: React.PropTypes.string,
            TaxesAndFees: React.PropTypes.string,
            TotalPrice: React.PropTypes.string,
            CarTypeCode: React.PropTypes.string,
            DailyRate: React.PropTypes.string,
            DropoffDay: React.PropTypes.string,
            DropoffTime: React.PropTypes.string,
            PickupDay: React.PropTypes.string,
            PickupTime: React.PropTypes.string,
            LocationDescription: React.PropTypes.string,
            MileageDescription: React.PropTypes.string,
            PickupAirport: React.PropTypes.string,
            RentalDays: React.PropTypes.string,
            VendorLocationId: React.PropTypes.string,
            TypicalSeating: React.PropTypes.string,
            CarTypeName: React.PropTypes.string,
            PossibleFeatures: React.PropTypes.string,
            PossibleModels: React.PropTypes.string
        })
    ),
    carTypes: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            TypicalSeating: React.PropTypes.string,
            CarTypeName: React.PropTypes.string,
            CarTypeCode: React.PropTypes.string,
            PossibleFeatures: React.PropTypes.string,
            PossibleModels: React.PropTypes.string
        })
    )
};

class Carlist extends PureComponent {
    render() {
        const {list, carTypes} = this.props;
        let carList;

        if (list.length) {
            const metadata = helpers.getCarsMetadata(carTypes);
            carList = list.map(car => <Car {...car} key={car.HWRefNumber} type={metadata[car.CarTypeCode]} />);
        }

        return (
            <div className="carlist">
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="VFXcard"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    transitionAppear
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                    {carList}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

Carlist.defaultProps = defaultProps;
Carlist.propTypes = propTypes;

export default Carlist;
