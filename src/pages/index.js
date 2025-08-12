import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

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

const container = document.querySelector(".content");
const profile = container.querySelector(".content__profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");
const cardTemplateSelector = "#card-template";
const cardContainerSelector = ".content__elements";
const viewImageSelector = "#popup-viewimage";

const imagePopup = new PopupWithImage(viewImageSelector);

const cardContainer = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const card = new Card(
        {
          name: name,
          link: link,
          handleCardClick: (evt, data) => {
            evt.preventDefault();
            imagePopup.open(data);
          },
        },
        cardTemplateSelector
      );
      const cardElement = card.generateCard();
      cardContainer.addItem(cardElement);
    },
  },
  cardContainerSelector
);

cardContainer.renderer();

// User Info

const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__occupation",
});

// popup Editar perfil

const editProfileSelector = "#popup-editprofile";
const popupEditProfile = document.querySelector(editProfileSelector);
const nameInput = popupEditProfile.querySelector("#name-input");
const jobInput = popupEditProfile.querySelector("#aboutme-input");
const formEditProfile = popupEditProfile.querySelector(".popup__form");

const editProfileFormValidation = new FormValidator(formEditProfile);

const editProfilePopup = new PopupWithForm(
  (evt) => {
    evt.preventDefault();
    if (
      !editProfileFormValidation.hasInvalidInput(editProfilePopup.inputList)
    ) {
      profileInfo.setUserInfo({
        name: nameInput.value,
        work: jobInput.value,
      });
      editProfilePopup.close(false);
    }
  },
  () => {
    editProfileFormValidation.resetFormValidation();
  },
  editProfileSelector
);

const handleEditForm = () => {
  editProfilePopup.open();
  const { name, work } = profileInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = work;
};

editButton.addEventListener("click", handleEditForm);

//popup Nuevo lugar

const newPlaceSelector = "#popup-newplace";
const popupNewPlace = document.querySelector(newPlaceSelector);
const formNewPlace = popupNewPlace.querySelector(".popup__form");

const newPlaceFormValidation = new FormValidator(formNewPlace);

const newPlacePopup = new PopupWithForm(
  (evt, { titulo, enlace }) => {
    evt.preventDefault();
    if (!newPlaceFormValidation.hasInvalidInput(newPlacePopup.inputList)) {
      const newCard = new Card(
        {
          name: titulo,
          link: enlace,
          handleCardClick: (evt, data) => {
            evt.preventDefault();
            imagePopup.open(data);
          },
        },
        cardTemplateSelector
      );
      const cardElement = newCard.generateCard();
      cardContainer.addItem(cardElement, true);
      newPlacePopup.close();
    }
  },
  () => {
    newPlaceFormValidation.resetFormValidation();
  },
  newPlaceSelector
);

const handleNewPlaceForm = () => {
  newPlacePopup.open();
};

addButton.addEventListener("click", handleNewPlaceForm);

//Crear clases FormValidator

editProfileFormValidation.enableValidation();
newPlaceFormValidation.enableValidation();
