export default class Card {
  constructor({ name, link, handleCardClick }, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    const likeButton = this._element.querySelector(".elements__like");
    const deleteButton = this._element.querySelector(".elements__btn-delete");
    const viewElement = this._element.querySelector(".elements__view");

    likeButton.addEventListener("click", (evt) => this._handleLike(evt));

    deleteButton.addEventListener("click", (evt) =>
      this._handleDeleteCard(evt)
    );

    viewElement.addEventListener("click", (evt) =>
      this._handleCardClick(evt, { name: this._name, link: this._link })
    );
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
