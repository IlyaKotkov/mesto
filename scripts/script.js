configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
};

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
const elementTemplate = document.querySelector('#element__template').content;

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

const popupImageWindow = document.querySelector('.popup_type_image');
const buttonClosedImagePopup = popupImageWindow.querySelector('.popup__closed');
const popupSignatureCard = document.querySelector('.popup__signature');
const popupElementImage = document.querySelector('.popup__image');

function openImagePopup(elementTitle, link) {
  popupElementImage.src = link;
  popupImageWindow.alt = popupElementImage;
  popupSignatureCard.textContent = elementTitle;
  openPopup(popupImageWindow);
}

buttonClosedImagePopup.addEventListener('click', () => {
  closePopup(popupImageWindow);
})

function render() {
  initialCards.reverse().forEach((value) => {
    const newCardImage = renderElement(value)
    if (newCardImage) renderCard(newCardImage, elementContent)
  })
}

function renderElement({ name, link }) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementTitle = element.querySelector(".element__title");
  const image = element.querySelector('.element__image');
  const trashButton = element.querySelector(".element__deleteButton")
  elementTitle.textContent = name;
  image.src = link;
  image.setAttribute("alt", name);

  image.addEventListener('click', () => {
    openImagePopup(name, link);
  });

  trashButton.addEventListener("click", () => {
    element.remove()
  })

  element.querySelector('.element__likeButton').addEventListener('click', (e) =>
    e.target.classList.toggle('element__likeButton_active')
  );

  return element;
}
render();

function renderCard(element, container) {
  container.prepend(element)
}

buttonOpenAddPopup.addEventListener('click', () => {
  disableSaveButton(popupAdd, configValidation)
  openPopup(popupAdd);
})

const popupInputNameImage = popupAdd.querySelector('.popup__input_type_name');
const popupInputLinkImage = popupAdd.querySelector('.popup__input_type_url');

function saveAddCard(event) {
  event.preventDefault();
  const name = popupInputNameImage.value;
  const link = popupInputLinkImage.value;
  const newCardImage = renderElement({ name, link })
  renderCard(newCardImage, elementContent)
  closePopup(popupAdd);
  profileAddForm.reset();
}
profileAddForm.addEventListener('submit', saveAddCard);

buttonCloseAddImage.addEventListener('click', () => {
  closePopup(popupAdd);
})


enableValidation(configValidation);

