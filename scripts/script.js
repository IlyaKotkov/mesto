const formProfileEdit = document.querySelector("#editForm")
const formProfileAdd = document.querySelector("#addForm")
const openPopupButton = document.querySelector('.profile__editButton');
const popup = document.querySelector('.popup');
const namePopupInput = document.querySelector('.popup__input_type_name');
const activityPopupInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description');
const openAddButton = document.querySelector('.profile__addButton');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const closePopupButton = popupEdit.querySelector('.popup__closed');
const closeAddPopupButton = popupAdd.querySelector('.popup__closed');
const elementContent = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element__template").content;
const submitPopup = popupAdd.querySelector('popup__submit');
 
function openPopup(popup) {
  popup.classList.add("popup_opened")
}

function closePopup(popup) {
  popup.classList.remove("popup_opened")
}

openPopupButton.addEventListener('click', () => {
    namePopupInput.value = profileName.textContent;
    activityPopupInput.value = profileDescription.textContent;
    openPopup(popupEdit);
})

function save(event) {
  event.preventDefault();
  profileName.textContent = namePopupInput.value;
  profileDescription.textContent = activityPopupInput.value;
  closePopup(popupEdit);
}
formProfileEdit.addEventListener('submit', save);

closePopupButton.addEventListener('click', () => {
  closePopup(popupEdit);
})

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

function render() {initialCards.forEach(renderElement);}

function renderElement({ name, link }) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  element.querySelector(".element__title").textContent = name;
  element.querySelector(".element__image").src = link;
  elementContent.prepend(element);

  element.querySelector('.element__deleteButton').addEventListener('click', () => {
    element.remove();
  });
  
  element.querySelector('.element__likeButton').addEventListener('click', (e) => 
   e.target.classList.toggle('element__likeButton_active')
  ); 
}
render();

openAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
})

const nameImage = popupAdd.querySelector('.popup__input_type_name');
const linkImage = document.querySelector('.popup__input_type_url');

function saveAddCard(event) {
  event.preventDefault();
  const name = nameImage.value;
  const link = linkImage.value;
  const newCardImage = renderElement({name, link})
  if (newCardImage) addCard(newCardImage, elementContent)
  closePopup(popupAdd);
  formProfileAdd.reset();
}
formProfileAdd.addEventListener('submit', saveAddCard);

closeAddPopupButton.addEventListener('click', () => {
  closePopup(popupAdd);
})

const imageCont = document.querySelector('.popup_type_image');
const image = document.querySelector('.element__image');
const imagePopup = document.querySelector('.popup__image');

image.addEventListener('click', () => {
  imagePopup.classList.toggle('show');
  openPopup(imageCont);
})