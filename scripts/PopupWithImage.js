import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
  }

  open(name, link) {
    this._popupFullImage = document.querySelector('.popup__image');
    this._popupFullImageText = document.querySelector('.popup__text_image');
    this._popupFullImage.src = link;
    this._popupFullImage.alt = name;
    this._popupFullImageText.textContent = name;
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

}
