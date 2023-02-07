export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector)
    }

    open(){
        this._popupSelector.classList.add("popup_opened")
        document.addEventListener("keydown", () => {
            this._handleEscClose(window.event)
        })
    }

    close(){
        this._popupSelector.classList.remove("popup_opened")
        document.removeEventListener("keydown", () => {
            this._handleEscClose(window.event)
        })
    }
    
    _handleEscClose(event) {
        if (event.code === "Escape") {
            this.close()
        }
    }

    _handleClosePopup(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close()
        }
    }

    setEventListeners() {
        this._popupSelector.querySelector(".popup__closed").addEventListener("click", () => {
            this.close()
          })
          document.addEventListener("mouseup", () => {
            this._handleClosePopup(window.event)
          })

    }
}
