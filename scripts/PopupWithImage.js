import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupSignatureCard = this._popup.querySelector('.popup__signature')
        this._popupImage = this._popup.querySelector('.popup__image')
    }

    open(name, link) {
        this._popupSignatureCard.textContent = name
        this._popupImage.alt = name
        this._popupImage.src = link

        super.open()
    }
}