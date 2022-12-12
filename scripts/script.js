let openPopupButton = document.querySelector('.profile__editButton');
let closePopupButton = document.querySelector('.popup__closed');
let popup = document.querySelector('.popup');
let namePopupInput = document.querySelector('.popup__input_type_name');
let activityPopupInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description');
let popupForm = document.querySelector('.popup__form');

function openPopup() {
    popup.classList.add('popup_opened');
    namePopupInput.value = profileName.textContent;
    activityPopupInput.value = profileDescription.textContent;

}
openPopupButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}
closePopupButton.addEventListener('click', closePopup);

function save(event) {
    event.preventDefault();
    profileName.textContent = namePopupInput.value;
    profileDescription.textContent = activityPopupInput.value;
    closePopup();
}
popupForm.addEventListener('submit', save);

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

const elementContent = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element__template").content;

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

  element.querySelector('.element__deleteButton').addEventListener('click', () => {
    element.remove();
  });

  element.querySelector('.element__likeButton').addEventListener('click', (e) => 
   e.target.classList.toggle('element__likeButton_active')
 ); 

   elementContent.append(element);
}

render();