export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        this._card = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);

        return this._card;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._like = this._element.querySelector(".element__likeButton")
        this._delete = this._element.querySelector(".element__deleteButton")

        return this._element;
    }

    _likeCard() {
        this._like.classList.toggle('.element__likeButton_active');
    }

    _deleteCard() {
        this._delete.closest(".element").remove();
    }

    _setEventListeners() {

        this._element.querySelector('.element__likeButton').addEventListener('click', (e) =>
            e.target.classList.toggle('element__likeButton_active'))

        this._element.querySelector('.element__deleteButton')
            .addEventListener('click', () => {
                this._deleteCard();
            });

        this._element.querySelector('.element__image')
            .addEventListener('click', () => {
                this._handleCardClick(this._name, this._link);
            });
    }
}



