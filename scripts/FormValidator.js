const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  activeButtonClass: 'popup__button_type_active',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._activeButtonClass = validationConfig.activeButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formElement = formElement;

  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {

    Array.from(this._formElement.querySelectorAll(this._inputSelector)).forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._item = inputElement;
        this._isValid();
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
  };

  _isValid() {
    if (!this._item.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  };

  _hasInvalidInput() {
    return Array.from(this._formElement.querySelectorAll(this._inputSelector)).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _showInputError() {
    const errorElement = this._formElement.querySelector(`.${this._item.id}-error`);
    this._item.classList.add(this._inputErrorClass);
    errorElement.textContent = this._item.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError() {
    const errorElement = this._formElement.querySelector(`.${this._item.id}-error`);
    this._item.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState() {

    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    if (this._hasInvalidInput()) {
      buttonElement.classList.remove(this._activeButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.add(this._activeButtonClass);
      buttonElement.disabled = false;
    }
  };

}

const forms = Array.from(document.querySelectorAll('.popup__form'));
forms.forEach((item) => {
  const form = new FormValidator(validationConfig, item);
  const formValidation = form.enableValidation();
})
