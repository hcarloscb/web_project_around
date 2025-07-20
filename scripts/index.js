const container = document.querySelector(".content");

const profile = container.querySelector(".content__profile");
const profileName = profile.querySelector(".profile__name");
const profileOccupation = profile.querySelector(".profile__occupation");

const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");

const elementsContainer = container.querySelector(".content__elements");

import { resetFormValidation } from "./validate.js";
import { hasInvalidInput } from "./validate.js";

const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

/* 
Función que añade nuevas tarjetas al grid,
ya sea al incio o al final dependiendo del parametro especificado.
incluye listeners para like, delete y view
*/
function createCard(name, link, position = "append") {
  const cardsTemplate = document.querySelector("#card-template").content;
  const cardElement = cardsTemplate
    .querySelector(".elements__card")
    .cloneNode(true);
  const image = cardElement.querySelector(".elements__image");
  const text = cardElement.querySelector(".elements__text");
  const likeBtn = cardElement.querySelector(".elements__like");
  const deleteBtn = cardElement.querySelector(".elements__btn-delete");
  const viewBtn = cardElement.querySelector(".elements__view");

  image.setAttribute("alt", name);
  text.textContent = name;
  image.setAttribute("src", link);

  likeBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    evt.target.classList.toggle("elements__like_active");
  });

  deleteBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    cardElement.remove();
  });

  viewBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    openPopup(popupViewImage);
    viewImage(link, name);
  });

  position === "append"
    ? elementsContainer.append(cardElement)
    : elementsContainer.prepend(cardElement);
}

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

initialCards.forEach(({ name, link }) => {
  createCard(name, link);
});

// popup Editar perfil

const popupEditProfile = document.querySelector("#popup-editprofile");

const nameInput = popupEditProfile.querySelector("#name-input");
const jobInput = popupEditProfile.querySelector("#aboutme-input");

const handleEditForm = () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
};

editButton.addEventListener("click", handleEditForm);

//popup Nuevo lugar

const popupNewPlace = document.querySelector("#popup-newplace");
const titleInput = popupNewPlace.querySelector("#title-input");
const linkInput = popupNewPlace.querySelector("#link-input");

const handleNewPlaceForm = () => {
  openPopup(popupNewPlace);
};

addButton.addEventListener("click", handleNewPlaceForm);

// Popup vista de imagen
const popupViewImage = document.querySelector("#popup-viewimage");
const popupImage = popupViewImage.querySelector(".popup__view-image");
const popupName = popupViewImage.querySelector(".popup__view-title");
// Función que permite abrir la visualización de una imagen
function viewImage(link, title) {
  popupImage.setAttribute("src", link);
  popupImage.setAttribute("alt", title);
  popupName.textContent = title;
}

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

    if (!hasInvalidInput(inputList)) {
      switch (popupElement.id) {
        case "popup-editprofile":
          console.log(popupElement.id);
          profileName.textContent = nameInput.value;
          profileOccupation.textContent = jobInput.value;
          break;
        case "popup-newplace":
          console.log(popupElement.id);
          createCard(titleInput.value, linkInput.value, "prepend");
          break;
        default:
          break;
      }
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
    resetFormValidation(form, validationConfig);
  }
  togglePopupListeners(popupElement, "remove");
  popupElement.classList.remove("page__popup_popup_opened");
}
