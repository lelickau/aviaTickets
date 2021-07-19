import '../css/style.css';
import './plugins';
import locations from "./store/location";
import formUI from './views/form';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', () => {
    initApp();

    const form = formUI.form;
    // events
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    })

    // handlers
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
    }

    async function onFormSubmit() {
        // сбор данных из формы
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDataValue;
        const return_date = formUI.returnDataValue;
        const currency = currencyUI.currencyValue;
        // CODE, CODE, 2021-09, 2021-10
        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency
        })
    }
})