import { openPopup } from "./utils.js";
const popupViewImage = document.querySelector("#popup-viewimage");
const popupImage = popupViewImage.querySelector(".popup__view-image");
const popupName = popupViewImage.querySelector(".popup__view-title");

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardsTemplate = document.querySelector(
      this._templateSelector
    ).content;
    const cardElement = cardsTemplate
      .querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  _handleLike(evt) {
    evt.preventDefault();
    evt.target.classList.toggle("elements__like_active");
  }

  _handleDeleteCard(evt) {
    evt.preventDefault();
    this._element.remove();
  }

  _viewImage() {
    popupImage.setAttribute("src", this._link);
    popupImage.setAttribute("alt", this._name);
    popupName.textContent = this._name;
  }

  _handleOpenView(evt) {
    evt.preventDefault();
    openPopup(popupViewImage);
    this._viewImage();
  }

  _setEventListeners() {
    const _likeButton = this._element.querySelector(".elements__like");
    const _deleteButton = this._element.querySelector(".elements__btn-delete");
    const _viewElement = this._element.querySelector(".elements__view");

    _likeButton.addEventListener("click", (evt) => this._handleLike(evt));

    _deleteButton.addEventListener("click", (evt) =>
      this._handleDeleteCard(evt)
    );

    _viewElement.addEventListener("click", (evt) => this._handleOpenView(evt));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element
      .querySelector(".elements__image")
      .setAttribute("alt", this._name);
    this._element
      .querySelector(".elements__image")
      .setAttribute("src", this._link);
    this._element.querySelector(".elements__text").textContent = this._name;

    return this._element;
  }
}

export { Card, popupImage, popupName };
