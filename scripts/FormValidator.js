export class FormValidator {
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
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._item = inputElement;
        this._errorElement = this._formElement.querySelector(`.${this._item.id}-error`);
        this._isValid();
        this._toggleButtonState();
      });
    });
  };

  _isValid() {
    if (!this._item.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _showInputError() {
    this._item.classList.add(this._inputErrorClass);
    this._errorElement.textContent = this._item.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError() {
    this._item.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  _toggleButtonState() {

    if (this._hasInvalidInput()) {
      this._buttonElement.classList.remove(this._activeButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.add(this._activeButtonClass);
      this._buttonElement.disabled = false;
    }
  };
}

export class AddCardFormValidator extends FormValidator {
  constructor(validationConfig, formElement) {
    super(validationConfig, formElement);
  }

  _enableButtonState() {
    this._buttonElement.classList.add(this._activeButtonClass);
    this._buttonElement.disabled = false;
  }

  enableValidation() {
    super._setEventListeners();
    this._enableButtonState();
  }
}
