
function showInputError(formElement, inputElement, config)  {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(config.errorClass)
    errorElement.textContent = inputElement.validationMessage
    inputElement.classList.add(config.inputErrorClass);
    console.log(showInputError)
};

function hideInputError (formElement, inputElement, config)  {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
    console.log(hideInputError)
};

function checkInputValidity(formElement, inputElement, config){
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, config)
  } else {
    hideInputError(formElement, inputElement, config)
};
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config)
    })
  })
}

  
function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    
    formList.forEach((formElement) => {
        setEventListeners(formElement, config)
    })    
}