import Popup from "./Popup.js";

export default class UserInfo extends Popup {
  constructor(selectorPopup, nameForm, statusForm, selectorName, selectorStatus) {
    super(selectorPopup);
    this._name = document.querySelector(nameForm);
    this._status = document.querySelector(statusForm);
    this._currentName = document.querySelector(selectorName);
    this._currentStatus = document.querySelector(selectorStatus);
  }

  getUserInfo() {
    this._name.value = this._currentName.innerText;
    this._status.value = this._currentStatus.innerText;
  }

  setUserInfo() {
    this._currentName.textContent = this._name.value;
    this._currentStatus.textContent = this._status.value;
  }
}
