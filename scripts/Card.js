import { openPopup } from "./index.js";
import { generatePopupEnlargeImage } from "./index.js";
import { popupFull } from "./index.js";

export class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this.template = template;
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
      this._openPopupEnlargeImage();
    })
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._element.closest('.element').remove();
  }

  _generatePopupEnlargeImage() {
    generatePopupEnlargeImage(this._name, this._link);
  }

  _openPopupEnlargeImage() {
    this._generatePopupEnlargeImage()
    openPopup(popupFull);
  }
}


