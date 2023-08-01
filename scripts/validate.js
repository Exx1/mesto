const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  activeButtonClass: 'popup__button_type_active',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function isValid(formElement, inputElement, inputErrorClass, errorClass) {

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function hasInvalidInput(inputList) {

  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, activeButtonClass) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.remove(activeButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.add(activeButtonClass);
    buttonElement.disabled = false;
  }
};

function setEventListeners(formElement, inputSelector, submitButtonSelector, activeButtonClass, inputErrorClass, errorClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, activeButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, activeButtonClass);
    });
  });
};

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig.inputSelector, validationConfig.submitButtonSelector, validationConfig.activeButtonClass, validationConfig.inputErrorClass, validationConfig.errorClass);
  });
};

export function enableSubmitButton(popup) {
  const popupButton = popup.querySelector('.popup__button');
  popupButton.disabled = false;
  popupButton.classList.add("popup__button_type_active");
}

function disableSubmitButton(popup) {
  const popupButton = popup.querySelector('.popup__button');
  popupButton.disabled = true;
  popupButton.classList.remove("popup__button_type_active");
}

enableValidation(validationConfig);
