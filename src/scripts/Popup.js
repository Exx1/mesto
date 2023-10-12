export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this.handleEscClose = this.handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.close();
  }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleOverlayClick);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this.handleEscClose);
  }
}
