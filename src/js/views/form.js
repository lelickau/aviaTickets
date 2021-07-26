import {getAutocompleteInstance, getDatePickerInstance} from '../plugins/materialize';

class FormUI {
    constructor(autocompleteInstance, datePickerInstance) {
        this._form = document.forms['locationControls'];
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = datePickerInstance( document.getElementById('datepicker-depart'));
        this.return = datePickerInstance(document.getElementById('datepicker-return'));
        this.originAutocomplete = autocompleteInstance(this.origin);
        this.destinationAutocomplete = autocompleteInstance(this.destination);
    }

    get form() {
        return this._form;
    }

    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }

    get departDataValue() {
        return this.depart.toString();
    }

    get returnDataValue() {
        return this.return.toString();
    }

    setAutocompleteData(data) {
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;