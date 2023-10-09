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
    this._formValuesArr = [this._formValues];
    return this._formValuesArr;
  }

  setEventListeners() {
    this._formAddCard.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitForm(this._getInputValues());
    });

    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('click', this._clickOverlayClose.bind(this));
    document.querySelector(".popup__close_image").addEventListener('click', this._clickButtonClose.bind(this));
  }

  close() {
    this._formAddCard.reset();
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }
}
