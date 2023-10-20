export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
    this._contentType = options.headers['Content-Type'];
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => this._checkStatus(res))
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
