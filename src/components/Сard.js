export default class Card {
    constructor(data, cardSelector, handleCardClick, userId, handleSetLike, removeLike, deleteIcon) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._cardOwnerId = data.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likes = data.likes
        this._handleSetLike = handleSetLike;
        this._removeLike = removeLike;
        this._userId = userId;
        this._deleteIcon = deleteIcon;
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
        this._likeNum = this._element.querySelector(".element__likeNumber")
        
        this._setEventListeners();

        this._image.src = this._link;
        this._image.alt = this._name;
        this._ownerDeleteCard();
        this._element.querySelector('.element__title').textContent = this._name;
        this._likeNum.textContent = this._likes.lenght

        return this._element;
    }

    

    likeCard() {
        this._like.classList.add('element__likeButton_active');
    }

    disLikeCard() {
        this._like.classList.remove('element__likeButton_active');
    }

    likesCount(data) {
        this._likes = data.likes
        this._likeNum.textContent = this._likes.length;
        
    }
    
    remove() {
        this._element.remove()
      }
    
    _ownerDeleteCard() {
        if (this._cardOwnerId !== this._userId) {
            this._delete.remove()
          }
    }

    _setEventListeners() {

        this._like.addEventListener('click', () => {
            if(this._like.classList.contains('element__likeButton_active')){
                this._removeLike(this._cardId); 
            } else {
                this._handleSetLike(this._cardId)
            }
            
        })

        this._delete.addEventListener('click', () => {
            this._deleteIcon(this, this._cardId);
        })

        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }
}

