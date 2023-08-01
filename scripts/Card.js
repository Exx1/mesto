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
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._toggleLike();
    })

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._deleteCard();
    })

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this.openPopupFullWidth();
    })
  }

  _toggleLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._element.closest('.element').remove();
  }

  _generatePopupEnlargeImage() {
    generatePopupEnlargeImage(this._name, this._link);
  }

  openPopupFullWidth() {
    this._generatePopupEnlargeImage()
    openPopup(popupFull);
  }

}


