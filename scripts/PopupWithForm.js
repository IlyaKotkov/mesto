import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm){
        super(popupSelector)
        this._callbackSubmitForm = callbackSubmitForm
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
          event.preventDefault();
          this._callbackSubmitForm(this._getInputValues());
        })
      }
}