import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup } from "./utils.js";

const container = document.querySelector(".content");

const profile = container.querySelector(".content__profile");
const profileName = profile.querySelector(".profile__name");
const profileOccupation = profile.querySelector(".profile__occupation");

const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");

const elementsContainer = container.querySelector(".content__elements");

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

const renderInitialCards = () => {
  initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, "#card-template");
    const cardElement = card.generateCard();
    elementsContainer.append(cardElement);
  });
};

renderInitialCards();

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

const handleNewPlaceForm = () => {
  openPopup(popupNewPlace);
};

addButton.addEventListener("click", handleNewPlaceForm);

//Crear clases FormValidator

const formEditProfile = popupEditProfile.querySelector(".popup__form");
const formNewPlace = popupNewPlace.querySelector(".popup__form");

const editProfileFormValidation = new FormValidator(formEditProfile);
const newPlaceFormValidation = new FormValidator(formNewPlace);

editProfileFormValidation.enableValidation();
newPlaceFormValidation.enableValidation();

export {
  editProfileFormValidation,
  newPlaceFormValidation,
  profileName,
  profileOccupation,
  elementsContainer,
  nameInput,
  jobInput,
};
