export default class FormValidator {
  constructor(formElement) {
    this._config = {
      popupSelector: ".popup",
      formSelector: ".popup__form",
      inputSelector: ".form__input",
      fieldsetSelector: ".form__fieldset",
      submitButtonSelector: ".form__button",
      inactiveButtonClass: "form__button_inactive",
      inputErrorClass: "form__input_type_error",
      errorClass: "form__input-error_active",
    };
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _setEventListeners(fieldsetElement) {
    const inputList = Array.from(
      fieldsetElement.querySelectorAll(this._config.inputSelector)
    );
    const buttonElement = fieldsetElement.querySelector(
      this._config.submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButtonState(inputList, buttonElement);
        this._checkInputValidity(inputElement);
      });
    });
  }

  enableValidation() {
    const fieldsetList = Array.from(
      this._formElement.querySelectorAll(this._config.fieldsetSelector)
    );
    fieldsetList.forEach((fieldset) => this._setEventListeners(fieldset));
  }

  resetFormValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._formElement.reset();
    inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `.${inputElement.id}-error`
      );
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
    });
    buttonElement.classList.add(this._config.inactiveButtonClass);
  }
}
