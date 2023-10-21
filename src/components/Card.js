export class Card {
  constructor(data, template, { open, popupDeleteCard, deleteCard, addLike, deleteLike, getUserId, popup }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.template = template;
    this._open = open;
    this._popupDeleteCard = popupDeleteCard;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
    this._getUserId = getUserId;
    this._deleteCardAccept = deleteCard;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this.likes = data.likes;
    this._popup = popup;
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
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._likeCounter.textContent = this._likes.length;
    this._element.id = this._cardId;
    this._likeActive(this._getUserId);
    this._hideTrashIcon(this._getUserId);

    return this._element;
  }

  _likeActive(id) {

    if (this.likes.length > 0) {
      this.likes.forEach(item => {
        if (item._id === id) {
          this._element.querySelector('.element__like').classList.add('element__like_active');
        }
      });
    }
  }

  _hideTrashIcon(id) {

      if (this._ownerId !== id) {
        this._element.querySelector('.element__trash').style.display = "none";
      }

  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    })

    this._element.querySelector('.element__trash').addEventListener('click', this._deleteCard);

    this._cardImage.addEventListener('click', () => {
      this._open(this._name, this._link);
    })
  }

  _toggleLike() {
    if (this._likeButton.classList.contains('element__like_active')) {
      this._deleteLike(this._element);
    } else {
      this._addLike(this._element);
    }
    this._likeButton.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._popupDeleteCard.open();
    this._popup.querySelector('.popup__button-delete').addEventListener('click', () => {
    this._deleteCardAccept(this._element.id);
    console.log(this._element);
    this._element.remove();
    this._element = null;
    });
  }
}


