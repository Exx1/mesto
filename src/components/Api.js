import Section from "./Section.js";
import { newCard } from "../pages/index.js";
import { handleCardClick } from "../pages/index.js";

export const elements = '.elements';
export const elementsTamplate = '#elements_template';


export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
    this._contentType = options.headers['Content-Type'];
    this._userName = document.querySelector('.profile__text');
    this._userStatus = document.querySelector('.profile__status');
  }

  getUserInfo() {
    const userAvatar = document.querySelector('.profile__avatar');
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
        userAvatar.link = res.avatar;
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

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        const cardList = new Section({items: res, renderer: (item) => {
            const card = newCard(item, elementsTamplate, handleCardClick);
            const cardElement = card.generateCard();

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

      .catch((err) => {
        console.log(err);
      });
  }

  // другие методы работы с API
}

