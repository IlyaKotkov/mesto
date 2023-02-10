export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)      
        this._closingOnEsc= this._handleEscClose.bind(this)
        this._clickButtonClose = this._popup.querySelector('.popup__closed')    
    }

    open(){
        this._popup.classList.add("popup_opened") 
        document.addEventListener('keydown', this._closingOnEsc)
    }

    close(){
        this._popup.classList.remove("popup_opened")
        document.removeEventListener('keydown', this._closingOnEsc)
    }
    
    _handleEscClose(event) {
        if (event.code === "Escape") {
            this.close()
        }
    }

    setEventListeners() {
        this._clickButtonClose.addEventListener('click', () => {
          this.close();
        });
        this._popup.addEventListener('mousedown', (event) => {
          if (event.target.classList.contains('popup_opened')) {
            this.close();
          }
        });
    }
}
