import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit
        this._popupForm = this._popup.querySelector('.popup__form');   
    }

    open(cardId) {
        super.open()
        this._cardId = cardId
       
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmit( this._cardId)
        })
    }
}