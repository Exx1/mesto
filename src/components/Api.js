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
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибкаа: ${res.status}`);
      })
      .then((res) => {
        const cardList = new Section({
          items: res, renderer: (item) => {
            const card = newCard(item, elementsTamplate, handleCardClick);
            const cardElement = card.generateCard();
            if (item.owner._id !== "8e020bb07b9fb09a45ecdc6f") {
              cardElement.querySelector('.element__trash').style.display = "none";
            }
            if(item.likes.length > 0) {
              item.likes.forEach(item => {
                if (item._id === "8e020bb07b9fb09a45ecdc6f") {
                  cardElement.querySelector('.element__like').classList.add('element__like_active');
                }
              });
            }
            cardElement.id = item._id;
            cardList.addItem(cardElement);
          }
        }, elements);

        cardList.renderer();
      })

      .catch((err) => {
        console.log(err);
      });
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
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })

      .then ((res) => {
        changeTextButtonWaiting(popupEditProfileselector);
        popupEditProfile.close();
      })

      .catch((err) => {
        console.log(err);
      });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })

      .then ((res) => {
        const cardList = new Section({
          items: res, renderer: (item) => {
            const card = newCard(item, elementsTamplate, handleCardClick);
            const cardElement = card.generateCard();

            cardElement.id = item._id;
            cardList.addItemPrepend(cardElement);
          }
        }, elements);

        cardList.renderer();
      })

      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      }
    })

      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  addLikeCard(element) {
    return fetch(`${this._baseUrl}cards/${element.id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      }
    })

      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        element.querySelector('.element__like-counter').textContent = res.likes.length;
      })

      .catch((err) => {
        console.log(err);
      });
  }

  deleteLikeCard(element) {
    return fetch(`${this._baseUrl}cards/${element.id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      }
    })

      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        element.querySelector('.element__like-counter').textContent = res.likes.length;
      })

      .catch((err) => {
        console.log(err);
      });
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

      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        changeTextButtonWaiting(popupEditAvatarSelector);
        this._userAvatar.src = res.avatar;
        popupEditAvatar.close();
      })

      .catch((err) => {
        console.log(err);
      });
  }

}
