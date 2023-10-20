import Section from "./Section.js";
import { newCard } from "../pages/index.js";
import { handleCardClick } from "../pages/index.js";
import { changeTextButtonWaiting } from "../pages/index.js";
import { popupEditAvatarSelector } from "../pages/index.js";
import { popupEditAvatar } from "../pages/index.js";
import { popupEditProfileselector } from "../pages/index.js";
import { popupEditProfile } from "../pages/index.js";

export const elements = '.elements';
export const elementsTamplate = '#elements_template';


export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
    this._contentType = options.headers['Content-Type'];
    this._userName = document.querySelector('.profile__text');
    this._userStatus = document.querySelector('.profile__status');
    this._userAvatar = document.querySelector('.profile__avatar');
  }

  getUserInfo() {

    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => this._checkStatus(res))
      .then((res) => {
        this._userName.textContent = res.name;
        this._userStatus.textContent = res.about;
        this._userAvatar.src = res.avatar;
      })

      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => this._checkStatus(res))

  }

  setUserInfo(name, status) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        about: status
      })
    })
      .then((res) => this._checkStatus(res))
  }

  setNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link
      })
    })
      .then((res) => this._checkStatus(res))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      }
    })
      .then((res) => this._checkStatus(res))
  }

  addLikeCard(element) {
    return fetch(`${this._baseUrl}cards/${element.id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      }
    })
      .then((res) => this._checkStatus(res))

  }

  deleteLikeCard(element) {
    return fetch(`${this._baseUrl}cards/${element.id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      }
    })

      .then((res) => this._checkStatus(res))
  }

  setAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then((res) => this._checkStatus(res))
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }
}
