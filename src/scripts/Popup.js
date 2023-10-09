export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add('popup_opened');

  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
  }

  _clickOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _clickButtonClose() {
    this.close();
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('click', this._clickOverlayClose.bind(this));
    document.querySelector(".popup__close_image").addEventListener('click', this._clickButtonClose.bind(this));
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.removeEventListener('click', this._clickOverlayClose.bind(this));
  }
}
