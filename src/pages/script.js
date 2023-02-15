import "./index.css"

import Card from "../components/Сard.js";
import { initialCards } from "../utils/initialCards.js";
import { configValidation } from "../utils/configValidation.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {buttonOpenPopupEdit, 
        buttonOpenAddPopup, 
        popupEditPopup, popupAdd, 
        popupNameProfileInput, 
        popupActivityInput
      } from "../utils/constants.js";

// Открытие картинки на полный экран
const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners()

function openImagePopup(name, link) {
  imagePopup.open(name, link)
}
// Открытие картинки на полный экран

// Функция генерации карточки
function createCard(data) {

  const card = new Card(data, '#element__template', openImagePopup)
  const cardTemplate = card.generateCard();

  return cardTemplate
}

const renderCard = item => section.addItem(createCard(item))

const section = new Section({
  items: initialCards,
  renderer: renderCard,
}, '.elements')
// Функция генерации карточки

// Функция создания новой карточки
const popupAddCard = new PopupWithForm('.popup_type_add', (item) => {
  renderCard(item)
  popupAddCard.close()
}
)
popupAddCard.setEventListeners()

function openPopupAddCard() {
  popupAddValidation.disableSubmitButton()
  popupAddCard.open()
}

buttonOpenAddPopup.addEventListener("click", () => openPopupAddCard())
// Функция создания новой карточки

// функция редактирования информации
function popupEditValues(value) {
  userInfo.setUserInfo(value.nameInput, value.jobInput)
  popupEdit.close()
}

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
})

const popupEdit = new PopupWithForm('.popup_type_edit', popupEditValues)
popupEdit.setEventListeners()

function popupEditProfileOpen() {
  const { name, job } = userInfo.getUserInfo()
  popupNameProfileInput.value = name
  popupActivityInput.value = job
  popupEditValidation.disableSubmitButton()
  popupEdit.open()
}

buttonOpenPopupEdit.addEventListener("click", () => popupEditProfileOpen())
// функция редактирования информации


const popupEditValidation = new FormValidator(configValidation, popupEditPopup)
popupEditValidation.enableValidation()

const popupAddValidation = new FormValidator(configValidation, popupAdd)
popupAddValidation.enableValidation()

section.renderItems();