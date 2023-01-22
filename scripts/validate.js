
// function showInputError(formElement, inputElement, config) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   errorElement.classList.add(config.errorClass)
//   errorElement.textContent = inputElement.validationMessage
//   inputElement.classList.add(config.inputErrorClass);
//   console.log(showInputError)
// };

// function hideInputError(formElement, inputElement, config) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
// }

// function checkInputValidity(formElement, inputElement, config) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, config)
//   } else {
//     hideInputError(formElement, inputElement, config)
//   };
// }

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => !inputElement.validity.valid);
// }

// function toggleButtonState(inputList, buttonElement, config) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(config.inactiveButtonClass)
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(config.inactiveButtonClass)
//     buttonElement.disabled = false;
//   }
// }

// function setEventListeners(formElement, config) {
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
//   const buttonElement = formElement.querySelector(config.submitButtonSelector)

//   toggleButtonState(inputList, buttonElement, config)

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, config)
//       toggleButtonState(inputList, buttonElement, config)
//     })
//   })
// }

// function disableSaveButton(popup, config) {
//   const buttonSubmit = popup.querySelector(config.submitButtonSelector)
//   if (buttonSubmit) {
//     buttonSubmit.classList.remove(config.activeButtonClass)
//     buttonSubmit.classList.add(config.inactiveButtonClass)
//     buttonSubmit.disabled = true
//   }
// }


// function enableValidation(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));

//   formList.forEach((formElement) => {
//     setEventListeners(formElement, config)
//   })
// }

// export {disableSaveButton, enableValidation}