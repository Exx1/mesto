import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._submitForm = submitForm;
  }

  _getInputValues() {

  }

  setEventListeners() {

  }

  close() {

  }
}
