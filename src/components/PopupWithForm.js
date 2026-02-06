import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, handleResetValidation, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleResetValidation = handleResetValidation;
    this._form = this._popupElement.querySelector(".popup__form");
    this.inputList = Array.from(this._form.querySelectorAll(".form__input"));
    this._submitButton = this._form.querySelector(".form__button");

    this._submitHandler = (evt) => {
      this._handleFormSubmit(evt, this._getInputValues());
    };
  }

  _getInputValues() {
    const formValues = {};
    this.inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener("submit", this._submitHandler);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener("submit", this._submitHandler);
  }

  close(needReset = true) {
    super.close();
    if (needReset) {
      this._form.reset();
    }
    this._handleResetValidation();
  }

  renderLoading(isloading) {
    if (isloading) {
      this._submitButton.textContent = "Guardando...";
    } else {
      this._submitButton.textContent = "Guardar";
    }
  }
}
