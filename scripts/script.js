import Card from "./Сard.js";
import { initialCards } from "./initialCards.js";
import { configValidation } from "./configValidation.js";
import FormValidator from "./FormValidator.js";

const profileEditForm = document.querySelector('#editForm')
const profileCardForm = document.querySelector('#addForm')
const buttonOpenPopupEdit = document.querySelector('.profile__editButton');
const popupInputName = document.querySelector('.popup__input_type_name');
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


function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener("keydown", closePopupEsc)
}

function closePopupEsc(event) {
  if (event.code === "Escape") {
    const popupOpened = document.querySelector(".popup_opened")
    closePopup(popupOpened)
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener("keydown", closePopupEsc)
}

popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__closed')) {
      closePopup(item)
    }
  })
})



buttonOpenPopupEdit.addEventListener('click', () => {
  popupInputName.value = profileName.textContent;
  popupActivityInput.value = profileDescription.textContent;
  openPopup(popupEdit);
})

function handleSaveEditProfile(event) {
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupActivityInput.value;
  closePopup(popupEdit);
}
profileEditForm.addEventListener('submit', handleSaveEditProfile);

function handleOpenImagePopup(elementTitle, link) {
  openPopup(popupImageWindow);
  popupCardImage.src = link;
  popupCardImage.alt = elementTitle;
  popupSignatureCard.textContent = elementTitle;
}

function createCard(data) {

  const card = new Card(data, '#element__template', handleOpenImagePopup)
  const cardTemplate = card.generateCard();

  return cardTemplate
}

function renderCard(cardData, container) {
  container.prepend(createCard(cardData))
}

initialCards.forEach((cardData) => {
  renderCard(cardData, cardsContainer)
})

buttonOpenAddPopup.addEventListener('click', () => {
  popupAddValidation.disableSubmitButton()
  openPopup(popupAdd);
})

function handleSaveAddCard(event) {
  event.preventDefault();
  renderCard({ name: popupInputNameImage.value, link: popupInputLinkImage.value }, cardsContainer);
  closePopup(popupAdd)
  profileCardForm.reset()
}
profileCardForm.addEventListener('submit', handleSaveAddCard);

popupEditValidation.enableValidation()
popupAddValidation.enableValidation()