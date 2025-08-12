export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);

    this._handleClosePopupBound = this._handleClosePopup.bind(this);
    this._handleEscCloseBound = this._handleEscClose.bind(this);
  }

  _handleClosePopup(evt) {
    const isButtonClick = evt.target.classList.contains("popup__close");
    const isOverlayClick = evt.target.classList.contains("page__popup");
    if (isButtonClick || isOverlayClick) {
      this.close();
    }
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _setEventListeners() {
    this._popupElement.addEventListener(
      "mousedown",
      this._handleClosePopupBound
    );
    document.addEventListener("keydown", this._handleEscCloseBound);
  }

  _removeEventListeners() {
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleClosePopupBound
    );
    document.removeEventListener("keydown", this._handleEscCloseBound);
  }

  open() {
    this._popupElement.classList.add("page__popup_popup_opened");
    this._setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("page__popup_popup_opened");
    this._removeEventListeners();
  }
}
