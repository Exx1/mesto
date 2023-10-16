export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
    this.options = options;
    this._contentType = options.headers['Content-Type'];
  }

  getInitialCards() {
    return fetch(this._baseUrl, {
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  // другие методы работы с API
}

