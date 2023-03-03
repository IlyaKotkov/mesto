export default class FormValidator {
    constructor(configValidation, formElement) {
        this._form = formElement;
        this._config = configValidation
        this._formSelector = configValidation.formSelector
        this._inputSelector = configValidation.inputSelector
        this._submitButtonSelector = configValidation.submitButtonSelector
        this._inactiveButtonClass = configValidation.inactiveButtonClass
        this._inputErrorClass = configValidation.inputErrorClass
        this._errorClass = configValidation.errorClass
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
        this._buttonSave = this._form.querySelector(this._submitButtonSelector)
    }

    _showInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.add(globalThis._errorClass);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement)
        } else {
            this._hideInputError(inputElement)
        };
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }

    disableSubmitButton() {
        this._buttonSave.classList.add(this._inactiveButtonClass)
        this._buttonSave.disabled = true;
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton()
        } else {
            this._buttonSave.classList.remove(this._inactiveButtonClass)
            this._buttonSave.disabled = false;
        }
    }

    _setEventListeners() {

        this._toggleButtonState(this._inputList, this._buttonSave)

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState(this._inputList, this._buttonSave)
            })
        })
    }

    enableValidation() {
        this._setEventListeners()
    }
}

export { FormValidator }