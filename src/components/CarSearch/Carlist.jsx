import React, {PureComponent} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {helpers} from '../../utils/hotwire';
import Car from './Car';

class Carlist extends PureComponent {
    render() {
        const {list, carTypes} = this.props;
        let carList;

        if (list.length) {
            const metadata = Carlist.getCarsMetadata(carTypes);
            carList = list.map(car =>
                <ReactCSSTransitionGroup
                    key={car.HWRefNumber}
                    transitionName="VFXcard"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    transitionAppear
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                    <Car {...car} type={metadata[car.CarTypeCode]} />
                </ReactCSSTransitionGroup>
            );
        }

        return (
            <div className="carlist">
                {carList}
            </div>
        );
    }
}

/**
 * Reduce car type array to a hash map for quick access to cartype information
 * @param  {Array} carTypes car type information as an array
 * @return {Object}         car type hash map with CarTypeCode as the keys
 */
Carlist.getCarsMetadata = carTypes => (carTypes.reduce((metadata, car) => {
    let temp = metadata;
    if (!metadata[car.CarTypeCode]) {
        temp = Object.assign(metadata, {
            [car.CarTypeCode]: Object.assign(car, helpers.getCarImage(car.CarTypeCode))
        });
    }

    return temp;
}, {}));

Carlist.defaultProps = {
    list: [],
    carTypes: []
};

Carlist.propTypes = {
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

export default Carlist;
