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
        popupEdit, popupAdd, 
        popupNameProfileInput, 
        popupActivityInput
      } from "../utils/constants.js";

// Открытие картинки на полный экран
const handleOpenImagePopup = new PopupWithImage('.popup_type_image');
handleOpenImagePopup.setEventListeners()

function openImagePopup(name, link) {
  handleOpenImagePopup.open(name, link)
}
// Открытие картинки на полный экран

// Функция генерации карточки
function createCard(data) {

  const card = new Card(data, '#element__template', openImagePopup)
  const cardTemplate = card.generateCard();

  return cardTemplate
}

const section = new Section({
  items: initialCards,
  renderer: (item) =>
    section.addItem(createCard(item)),
}, '.elements')
// Функция генерации карточки

// Функция создания новой карточки
const popupClassAdd = new PopupWithForm('.popup_type_add', (item) => {
  section.addItem(createCard(item))
  popupClassAdd.close()
}
)
popupClassAdd.setEventListeners()

function popupAddCard() {
  popupAddValidation.disableSubmitButton()
  popupClassAdd.open()
}

buttonOpenAddPopup.addEventListener("click", () => popupAddCard())
// Функция создания новой карточки

// функция редактирования информации
function popupEditValues(value) {
  userInfo.setUserInfo(value.nameInput, value.jobInput)
  popupClassEdit.close()
}

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
})

const popupClassEdit = new PopupWithForm('.popup_type_edit', popupEditValues)
popupClassEdit.setEventListeners()

function popupEditProfileOpen() {
  const { name, job } = userInfo.getUserInfo()
  popupNameProfileInput.value = name
  popupActivityInput.value = job
  popupEditValidation.disableSubmitButton()
  popupClassEdit.open()
}

buttonOpenPopupEdit.addEventListener("click", () => popupEditProfileOpen())
// функция редактирования информации


const popupEditValidation = new FormValidator(configValidation, popupEdit)
popupEditValidation.enableValidation()

const popupAddValidation = new FormValidator(configValidation, popupAdd)
popupAddValidation.enableValidation()

section.rendererItems();