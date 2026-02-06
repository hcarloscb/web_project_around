export default class Card {
  constructor(
    { name, link, id, isLiked, handleCardClick, handleDeleteCard, handleLike },
    templateSelector,
  ) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._isLiked = isLiked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
  }

  _getTemplate() {
    const cardsTemplate = document.querySelector(
      this._templateSelector,
    ).content;
    const cardElement = cardsTemplate
      .querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  setLikeState(isLiked) {
    this._isLiked = isLiked;
    this._likeImage.classList.toggle("elements__like_active", this._isLiked);
  }

  remove(evt) {
    evt.preventDefault();
    this._element.remove();
  }

  _setEventListeners() {
    this._likeImage = this._element.querySelector(".elements__like-img");

    const likeButton = this._element.querySelector(".elements__like");
    const deleteButton = this._element.querySelector(".elements__btn-delete");
    const viewElement = this._element.querySelector(".elements__view");

    likeButton.addEventListener("click", (evt) => this._handleLike(evt));

    deleteButton.addEventListener("click", (evt) =>
      this._handleDeleteCard(evt),
    );

    viewElement.addEventListener("click", (evt) =>
      this._handleCardClick(evt, { name: this._name, link: this._link }),
    );
  }

  isLiked() {
    return this._isLiked;
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
    if (this._isLiked) {
      this._element
        .querySelector(".elements__like-img")
        .classList.add("elements__like_active");
    }

    return this._element;
  }
}
