import Card from "./card.js";
import { initialCards } from "./initialcards.js";
import { configValidation } from "./configvalidation.js";
import FormValidator from "./FormValidator.js";

const profileEditForm = document.querySelector('#editForm')
const profileAddForm = document.querySelector('#addForm')
const buttonOpenPopupEdit = document.querySelector('.profile__editButton');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupActivityInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description');
const buttonOpenAddPopup = document.querySelector('.profile__addButton');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const buttonCloseEditProfile = popupEdit.querySelector('.popup__closed');
const buttonCloseAddImage = popupAdd.querySelector('.popup__closed');
const elementContent = document.querySelector('.elements');
const popupInputNameImage = popupAdd.querySelector('.popup__input_type_name');
const popupInputLinkImage = popupAdd.querySelector('.popup__input_type_url');
const popupImageWindow = document.querySelector('.popup_type_image');
const buttonClosedImagePopup = popupImageWindow.querySelector('.popup__closed');
const popupSignatureCard = document.querySelector('.popup__signature');
const popupElementImage = document.querySelector('.popup__image');
const popupEditValidation = new FormValidator(configValidation, popupEdit)
const popupAddValidation = new FormValidator(configValidation, popupAdd)


function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener("keydown", closePopupEsc)
}

function closePopupEsc(event) {
  if (event.code == "Escape") {
    const popupOpened = document.querySelector(".popup_opened")
    closePopup(popupOpened)
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener("keydown", closePopupEsc)
}

const popups = document.querySelectorAll('.popup')
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(item)
    }
  })
})

buttonOpenPopupEdit.addEventListener('click', () => {
  popupInputName.value = profileName.textContent;
  popupActivityInput.value = profileDescription.textContent;
  popupEditValidation.disableSubmitButton()
  openPopup(popupEdit);
})

function saveEditProfile(event) {
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupActivityInput.value;
  closePopup(popupEdit);
}
profileEditForm.addEventListener('submit', saveEditProfile);

buttonCloseEditProfile.addEventListener('click', () => {
  closePopup(popupEdit);
})

function openImagePopup(elementTitle, link) {
  openPopup(popupImageWindow);
  popupElementImage.src = link;
  popupElementImage.alt = elementTitle;
  popupSignatureCard.textContent = elementTitle;
}

buttonClosedImagePopup.addEventListener('click', () => {
  closePopup(popupImageWindow);
})

function createCard(data) {

  const card = new Card(data, '#element__template', openImagePopup)
  const cardTemplate = card.generateCard();

  return cardTemplate
}

function renderCard(cardData, container) {
  container.prepend(createCard(cardData))
}

initialCards.forEach((cardData) => {
  renderCard(cardData, elementContent)
})

buttonOpenAddPopup.addEventListener('click', () => {
  popupAddValidation.disableSubmitButton()
  openPopup(popupAdd);
})

function saveAddCard(event) {
  event.preventDefault();
  renderCard({ name: popupInputNameImage.value, link: popupInputLinkImage.value }, elementContent);
  closePopup(popupAdd)
}
profileAddForm.addEventListener('submit', saveAddCard);

buttonCloseAddImage.addEventListener('click', () => {
  closePopup(popupAdd);
})

popupEditValidation.enableValidation()
popupAddValidation.enableValidation()