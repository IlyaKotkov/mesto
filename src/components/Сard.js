export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate(){
        this._card =
        document.querySelector(this._cardSelector)
        .content
        .querySelector(".element")
        .cloneNode(true);
        
        return this._card
    }

    generateCard() {
        this._element = this._getTemplate();
        this._like = this._element.querySelector(".element__likeButton")
        this._delete = this._element.querySelector(".element__deleteButton")
        this._image = this._element.querySelector(".element__image")
        this._setEventListeners();

        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

    _likeCard() {
        this._like.classList.toggle('element__likeButton_active');
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {

        this._like.addEventListener('click', () => {
            this._likeCard();
        })

        this._delete.addEventListener('click', () => {
            this._deleteCard();
        })

        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }
}


