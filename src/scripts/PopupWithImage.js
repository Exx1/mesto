import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
  }

  open(name, link) {
    super.open();
    this._popupFullImage = this._popup.querySelector('.popup__image');
    this._popupFullImageText = this._popup.querySelector('.popup__text_image');
    this._popupFullImage.src = link;
    this._popupFullImage.alt = name;
    this._popupFullImageText.textContent = name;
  }
}
