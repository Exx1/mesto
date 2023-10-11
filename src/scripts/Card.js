export class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this.template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTamplate() {
    const cardElement = document
      .querySelector(this.template)
      .content
      .querySelector('.element').
      cloneNode(true);

      return cardElement;
  }

  generateCard() {
    this._element = this._getTamplate();
    this._cardImage =  this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like');
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    })

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._deleteCard();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}


