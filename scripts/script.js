import Card from "./Сard.js";
import { initialCards } from "./initialCards.js";
import { configValidation } from "./configValidation.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";


const buttonOpenPopupEdit = document.querySelector('.profile__editButton');
const buttonOpenAddPopup = document.querySelector('.profile__addButton');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupNameProfileInput = popupEdit.querySelector('.popup__input_type_name');
const popupActivityInput = popupEdit.querySelector('.popup__input_type_job');



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