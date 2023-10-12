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

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._status.textContent = data.status;
  }
}
