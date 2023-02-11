import Card from "./Сard.js";
import { initialCards } from "./initialCards.js";
import { configValidation } from "./configValidation.js";
import FormValidator from "./FormValidator.js";
import  Section  from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const profileEditForm = document.querySelector('#editForm')
const profileCardForm = document.querySelector('#addForm')
const buttonOpenPopupEdit = document.querySelector('.profile__editButton');
const popupActivityInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description');
const buttonOpenAddPopup = document.querySelector('.profile__addButton');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const cardsContainer = document.querySelector('.elements');
const popupInputNameImage = popupAdd.querySelector('.popup__input_type_name');
const popupInputLinkImage = popupAdd.querySelector('.popup__input_type_url');
const popupImageWindow = document.querySelector('.popup_type_image');
const popupSignatureCard = document.querySelector('.popup__signature');
const popupCardImage = document.querySelector('.popup__image');
const popups = document.querySelectorAll('.popup')
const popupEditValidation = new FormValidator(configValidation, popupEdit)
const popupAddValidation = new FormValidator(configValidation, popupAdd)


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
},'.elements')
// Функция генерации карточки

// Функция создания новой карточки
const popupClassAdd = new PopupWithForm('.popup_type_add',(item) => {
  section.addItem(createCard(item))
  popupClassAdd.close()
  }
)
popupClassAdd.setEventListeners()

function popupAddCard() {
  popupAddValidation.disableSubmitButton()
  popupClassAdd.open()
}

// функция редактирования информации
function popupEditValues(value) {
  userInfo.setUserInfo(value.nameInput, value.jobInput)
  popupClassEdit.close()
}

const userInfo = new UserInfo({
  name: ".popup__input_type_name",
  job: ".popup__input_type_job",
})

const popupClassEdit = new PopupWithForm('.popup_type_edit',popupEditValues)
popupClassEdit.setEventListeners()

function popupEditProfile() {
  const { name, job } = userInfo.getUserInfo()
  popupInputNameImage.value = name
  popupActivityInput.value = job
  popupEditValidation.disableSubmitButton()
  popupClassEdit.open()
}


popupEditValidation.enableValidation()
popupAddValidation.enableValidation()

buttonOpenAddPopup.addEventListener("click", () => popupAddCard())
buttonOpenPopupEdit.addEventListener("click", () => popupEditProfile())

section.rendererItems();