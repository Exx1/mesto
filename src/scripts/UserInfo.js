export default class UserInfo {
  constructor(nameForm, statusForm) {
    this._name = document.querySelector(nameForm);
    this._status = document.querySelector(statusForm);
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userStatus: this._status.textContent
    }
  }

  setUserInfo( userName, userDescription) {
    this._name.textContent = userName.value;
    this._status.textContent = userDescription.value;
  }
}
