import { popupDeleteCard } from "../pages/index.js";
import { api } from "../pages/index.js";

export class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.template = template;
    this._handleCardClick = handleCardClick;
    this._deleteCard = this._deleteCard.bind(this);
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
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._likeCounter.textContent = this._likes.length;

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    })

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      popupDeleteCard.open();
      document.querySelector('.popup__button-delete').addEventListener('click', this._deleteCard);
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  _toggleLike() {
    if (this._likeButton.classList.contains('element__like_active')) {
      api.deleteLikeCard(this._element)
      .then((res) => {
        this._element.querySelector('.element__like-counter').textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      api.addLikeCard(this._element)
      .then((res) => {
        this._element.querySelector('.element__like-counter').textContent = res.likes.length;
      })

      .catch((err) => {
        console.log(err);
      });
    }

    this._likeButton.classList.toggle('element__like_active');

  }

  _deleteCard() {
    document.querySelector('.popup__button-delete').removeEventListener('click', this._deleteCard)
    popupDeleteCard.close();
    api.deleteCard(this._element.id)

    .catch((err) => {
      console.log(err);
    });
    this._element.remove();
    this._element = null;
  }
}


