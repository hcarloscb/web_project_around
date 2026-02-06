import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form");

    this._submitHandler = (evt) => {
      this._handleFormSubmit(evt);
    };
  }

  getItem() {
    return this._item;
  }

  open(item) {
    super.open();
    this._item = item;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener("submit", this._submitHandler);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener("submit", this._submitHandler);
  }
}
