import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._image = this._popupElement.querySelector(".popup__view-image");
    this._name = this._popupElement.querySelector(".popup__view-title");
  }

  open({ name, link }) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._name.textContent = name;
  }
}
