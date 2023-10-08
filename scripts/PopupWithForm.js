import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._submitForm = submitForm;
    this._formAddCard = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {

    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._formAddCard.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitForm(this._getInputValues());
    });
  }

  close() {
    this._formAddCard.reset();
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }
}
