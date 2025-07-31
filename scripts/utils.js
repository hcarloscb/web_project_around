import { Card, popupImage, popupName } from "./Card.js";
import {
  editProfileFormValidation,
  newPlaceFormValidation,
  profileName,
  profileOccupation,
  elementsContainer,
  nameInput,
  jobInput,
} from "./index.js";

const popupNewPlace = document.querySelector("#popup-newplace");
const titleInput = popupNewPlace.querySelector("#title-input");
const linkInput = popupNewPlace.querySelector("#link-input");

const createCard = (name, link) => {
  const card = new Card(name, link, "#card-template");
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
};

// Popup vista de imagen

const resetViewElement = () => {
  popupImage.setAttribute("src", "");
  popupImage.setAttribute("alt", "");
  popupName.textContent = "";
};

//Funciones Popup

const handlePopupClose = (popupElement) => {
  return function (evt) {
    const isEscape = evt.key === "Escape";
    const isOverlayClick = evt.target.classList.contains("page__popup");
    const isButtonClick = evt.target.classList.contains("popup__close");
    if (isEscape || isOverlayClick || isButtonClick) {
      if (popupElement.id === "popup-viewimage") {
        resetViewElement();
      }
      closePopup(popupElement);
    }
  };
};

const handleFormSubmit = (popupElement) => {
  return function (evt) {
    evt.preventDefault();
    const inputList = Array.from(popupElement.querySelectorAll(".form__input"));

    if (
      popupElement.id === "popup-editprofile" &&
      !editProfileFormValidation.hasInvalidInput(inputList)
    ) {
      profileName.textContent = nameInput.value;
      profileOccupation.textContent = jobInput.value;
      closePopup(popupElement);
    }

    if (
      popupElement.id === "popup-newplace" &&
      !newPlaceFormValidation.hasInvalidInput(inputList)
    ) {
      createCard(titleInput.value, linkInput.value);
      closePopup(popupElement);
    }
  };
};

const togglePopupListeners = (popupElement, action) => {
  if (!popupElement.popupCloseListener) {
    popupElement.popupCloseListener = handlePopupClose(popupElement);
  }
  const formElement = popupElement.querySelector(".popup__form");
  if (!popupElement.setFormSubmit && formElement) {
    popupElement.setFormSubmit = handleFormSubmit(popupElement);
  }

  const listener = popupElement.popupCloseListener;
  const setSubmit = popupElement.setFormSubmit;
  const popupCloseElement = popupElement.querySelector(".popup__close");

  if (action === "add") {
    popupCloseElement.addEventListener("click", listener);
    document.addEventListener("keydown", listener);
    popupElement.addEventListener("mousedown", listener);
    formElement ? formElement.addEventListener("submit", setSubmit) : "";
  } else if (action === "remove") {
    popupCloseElement.removeEventListener("click", listener);
    document.removeEventListener("keydown", listener);
    popupElement.removeEventListener("mousedown", listener);
    formElement ? formElement.removeEventListener("submit", setSubmit) : "";
  }
};

function openPopup(popupElement) {
  popupElement.classList.add("page__popup_popup_opened");
  togglePopupListeners(popupElement, "add");
}

function closePopup(popupElement) {
  const form = popupElement.querySelector("form");
  if (form) {
    if (popupElement.id === "popup-editprofile") {
      editProfileFormValidation.resetFormValidation();
    } else if (popupElement.id === "popup-newplace") {
      newPlaceFormValidation.resetFormValidation();
    }
  }
  togglePopupListeners(popupElement, "remove");
  popupElement.classList.remove("page__popup_popup_opened");
}

export { openPopup };
