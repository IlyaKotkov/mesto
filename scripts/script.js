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
