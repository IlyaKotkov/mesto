import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
        super(popupSelector)
        this._callbackSubmitForm = callbackSubmitForm
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll(".popup__input")
        this._submitButon = this._popupForm.querySelector('.popup__submit')
        this._submitButtonText = this._submitButon.textContent;
        console.log(this._submitButtonText)
    }

    _getInputValues() {
        const values = {};
        this._inputList.forEach(input => {
            values[input.name] = input.value;
        })
        return values;
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    loading(isLoading) {
        if(isLoading) {
            this._submitButon.textContent ='Сохранение...'
        } else {
            this._submitButon.textContent = this._submitButtonText
        }
    }

    setInputValue(data) {
        this._inputList.forEach((input) => {
          input.value = data[input.name]
        })
      }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();  
            this._callbackSubmitForm(this._getInputValues())    
        })
    }
}