import {MobileModal} from '../Layout';

class ModalCalendar extends MobileModal {
    handleWindowResize() {
        this.setState({
            width: parseInt(window.innerWidth, 10),
            // NOTE: The datepicker does not take height of the entire component
            // For now adjust manually for the header elements of the datepicker and modal title (58+20+20+49+36)=183px
            height: parseInt(window.innerHeight, 10) - 183
        });
    }
}

export default ModalCalendar;
