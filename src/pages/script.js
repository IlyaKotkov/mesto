import "./index.css"

import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Card from "../components/Сard.js";
import { configValidation } from "../utils/configValidation.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  buttonOpenPopupEdit,
  buttonOpenAddPopup,
  popupEditPopup, popupAdd,
  popupNameProfileInput,
  popupActivityInput,
  buttonOpenEditAvatarPopup,
  popupAvatar
} from "../utils/constants.js";

import Api from "../utils/Api.js"

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '3bfa8be2-7db2-4374-bd7f-9f079ca2255b',
    "Content-Type": "application/json",
  }
})

let userId

Promise.all([api.getInitialCards(), api.getInformation()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err)
  })

function createCard(data) {

  const card = new Card(data,'#element-template',openImagePopup,userId,

    async () => {
      try {
        const likeCardCount = await api.setLike(data._id)
        card.likeCard()
        card.likesCount(likeCardCount)
      } catch (error) {
        return console.log(`Ошибка: ${error}`)
      }
    },
    async () => {
      try {
        const likeCardCount = await api.deleteLike(data._id)
        card.disLikeCard()
        card.likesCount(likeCardCount)
      } catch (error) {
        return console.log(`Ошибка: ${error}`)
      }
    },
    () => {
      popupWithConfirmation.open(card)
    }
)
  const cardTemplate = card.generateCard();
  return cardTemplate
}

const popupWithConfirmation = new PopupWithConfirmation('.popup_type_delete', handleDeletePopup)
popupWithConfirmation.setEventListeners()

  function handleDeletePopup(card) {
    api.deleteCard(card._cardId).then((res) => {
      card.remove(res)
      popupWithConfirmation.close()
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
  }

const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card))
  }
}, '.elements')

// Открытие картинки на полный экран
const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners()

function openImagePopup(name, link) {
  imagePopup.open(name, link)
}
// Открытие картинки на полный экран

// Функция создания новой карточки
const popupAddCard = new PopupWithForm('.popup_type_add', handleFormSubmit)

function handleFormSubmit(data) {

    popupAddCard.loading(true)
    api.addCard(data).then((res) => {
      cardsList.addItem(createCard(res))
      popupAddCard.close()
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
  .finally(() => {
    popupAddCard.loading(false)
  })
}
popupAddCard.setEventListeners()

function addPopupOpen() {
  popupAddValidation.disableSubmitButton()
  popupAddCard.open()
}


buttonOpenAddPopup.addEventListener("click", () => addPopupOpen())
// Функция создания новой карточки

// функция редактирования информации
const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__description",
  avatar: ".profile__avatar"
})

function handlePopupEditSubmit(data) {
  popupEdit.loading(true)
  api.editUserInfo(data).then((res) => {
    userInfo.setUserInfo(res)
    popupEdit.close()
  })
  .catch((error) => console.log(`Ошибка: ${error}`))
  .finally(() => {
    popupEdit.loading(false)
  })
}

const popupEdit = new PopupWithForm('.popup_type_edit', handlePopupEditSubmit)
popupEdit.setEventListeners()

function openPopupProfile() {
  popupEdit.open()
  popupEdit.setInputValue(userInfo.getUserInfo())
  popupEditValidation.disableSubmitButton()
}

buttonOpenPopupEdit.addEventListener("click", () => openPopupProfile())
// функция редактирования информации
// функция обновления аватара

 const popupEditAvatar = new PopupWithForm('.popup_type_editAvatar', handlePopupAvatarSubmit)
 popupEditAvatar.setEventListeners()

 function handlePopupAvatarSubmit(data) {
  popupEditAvatar.loading(true)
  api.editAvatar(data).then((res) => {
    userInfo.setUserInfo(res)
    popupEditAvatar.close()
  })
  .catch((error) => console.log(`Ошибка: ${error}`))
  .finally(() => {
    popupEditAvatar.loading(false)
  })
 }

function openAvatarProfile() {
  popupEditAvatarValidation.disableSubmitButton()
  popupEditAvatar.open()
}

buttonOpenEditAvatarPopup.addEventListener("click", openAvatarProfile)
 
 const popupEditAvatarValidation = new FormValidator(configValidation, popupAvatar)
 popupEditAvatarValidation.enableValidation()

const popupEditValidation = new FormValidator(configValidation, popupEditPopup)
popupEditValidation.enableValidation()

const popupAddValidation = new FormValidator(configValidation, popupAdd)
popupAddValidation.enableValidation()
