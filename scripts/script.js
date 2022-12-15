const openPopupButton = document.querySelector('.profile__editButton');
const popup = document.querySelector('.popup');
const namePopupInput = document.querySelector('.popup__input_type_name');
const activityPopupInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description');
const popupForm = document.querySelector('.popup__form');
const openAddButton = document.querySelector('.profile__addButton');
const popupCardForm = document.querySelector('.popup-card__form');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const closePopupButton = popupEdit.querySelector('.popup__closed');
const closeAddPopupButton = popupAdd.querySelector('.popup__closed');
const elementContent = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element__template").content;
const popupFormAdd = popupAdd.querySelector('.popup__form');

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
popupForm.addEventListener('submit', save);

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

const elementInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

function render() {elementInfo.forEach(renderElement);}

function renderElement({ name, link }) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  element.querySelector(".element__title").textContent = name;
  element.querySelector(".element__image").src = link;
  elementContent.append(element);

  const trash = element.querySelector('.element__deleteButton').addEventListener('click', () => {
    element.remove();
  });
  
  const like = element.querySelector('.element__likeButton').addEventListener('click', (e) => 
   e.target.classList.toggle('element__likeButton_active')
  ); 
}
render();

openAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
})

function saveAddCard(event) {
  event.preventDefault();

  closePopup(popupAdd);
}
popupFormAdd.addEventListener('submit', saveAddCard);

closeAddPopupButton.addEventListener('click', () => {
  closePopup(popupAdd);
})