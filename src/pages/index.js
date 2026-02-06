import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const container = document.querySelector(".content");
const profile = container.querySelector(".content__profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");
const cardTemplateSelector = "#card-template";
const cardContainerSelector = ".content__elements";
const viewImageSelector = "#popup-viewimage";

//Se crea instancia de Api.js

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "df703a2a-4064-42da-b2b6-a48ecb78334d",
    "Content-Type": "application/json",
  },
});

const imagePopup = new PopupWithImage(viewImageSelector);

//Popup elminar tarjeta

const popupDeleteCardSelector = "#popup-deletecard";

const deleteCardPopup = new PopupWithConfirmation((evt) => {
  evt.preventDefault();
  const card = deleteCardPopup.getItem();
  api
    .deleteCard(card)
    .then((result) => {
      console.log(result.message);
      card.remove(evt);
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
}, popupDeleteCardSelector);

// Crea la sección que contiene las tarjetas

function createCard({ name, link, _id, isLiked }) {
  const card = new Card(
    {
      name,
      link,
      id: _id,
      isLiked,
      handleCardClick: (evt, data) => {
        evt.preventDefault();
        imagePopup.open(data);
      },
      handleDeleteCard: (evt) => {
        evt.preventDefault();
        deleteCardPopup.open(card);
      },
      handleLike: (evt) => {
        evt.preventDefault();
        const methodLike = card.isLiked() ? "DELETE" : "PUT";
        api
          .putLike(card, methodLike)
          .then((result) => {
            card.setLikeState(result.isLiked);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    cardTemplateSelector,
  );
  return card.generateCard();
}

const cardContainer = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardContainer.addItem(cardElement);
    },
  },
  cardContainerSelector,
);

// GET Cargar datos iniciales de usuario (cards y userinfo)

const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__occupation",
  avatarSelector: ".profile__elipse",
});

api
  .getInitialData()
  .then(([userData, cards]) => {
    profileInfo.setUserInfo({
      name: userData.name,
      work: userData.about,
    });

    profileInfo.setUserAvatar({
      avatar: userData.avatar,
    });

    cardContainer.setItems(cards);
    cardContainer.renderer();
  })
  .catch((err) => {
    console.log(err);
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
      // PATCH Editar la información del perfil en el servidor
      editProfilePopup.renderLoading(true);
      api
        .patchUserInfo({
          name: nameInput.value,
          about: jobInput.value,
        })
        .then((result) => {
          profileInfo.setUserInfo({
            name: result.name,
            work: result.about,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          editProfilePopup.close(false);
          editProfilePopup.renderLoading(false);
        });
    }
  },
  () => {
    editProfileFormValidation.resetFormValidation();
  },
  editProfileSelector,
);

const handleEditForm = () => {
  editProfilePopup.open();
  const { name, work } = profileInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = work;
};

editButton.addEventListener("click", handleEditForm);

// Editar avatar

const editAvatarSelector = "#popup-editavatar";
const popupEditAvatar = document.querySelector(editAvatarSelector);
const formEditAvatar = popupEditAvatar.querySelector(".popup__form");
const editAvatarButton = profile.querySelector(".profile__button-edit");

const editAvatarFormValidation = new FormValidator(formEditAvatar);

const editAvatarPopup = new PopupWithForm(
  (evt, { avatarurl }) => {
    evt.preventDefault();
    if (!editAvatarFormValidation.hasInvalidInput(editAvatarPopup.inputList)) {
      editAvatarPopup.renderLoading(true);
      api
        .patchEditAvatar({ avatarurl })
        .then((result) => {
          profileInfo.setUserAvatar({
            avatar: result.avatar,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          editAvatarPopup.close();
          editAvatarPopup.renderLoading(false);
        });
    }
  },
  () => {
    editAvatarFormValidation.resetFormValidation();
  },
  editAvatarSelector,
);

const handleEditAvatarForm = () => {
  editAvatarPopup.open();
};

editAvatarButton.addEventListener("click", handleEditAvatarForm);

//popup Nuevo lugar

const newPlaceSelector = "#popup-newplace";
const popupNewPlace = document.querySelector(newPlaceSelector);
const formNewPlace = popupNewPlace.querySelector(".popup__form");

const newPlaceFormValidation = new FormValidator(formNewPlace);

const newPlacePopup = new PopupWithForm(
  (evt, { titulo, enlace }) => {
    evt.preventDefault();
    if (!newPlaceFormValidation.hasInvalidInput(newPlacePopup.inputList)) {
      newPlacePopup.renderLoading(true);
      api
        .postNewPlace({ titulo, enlace })
        .then((result) => {
          const cardElement = createCard(result);
          cardContainer.addItem(cardElement, true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          newPlacePopup.close();
          newPlacePopup.renderLoading(false);
        });
    }
  },
  () => {
    newPlaceFormValidation.resetFormValidation();
  },
  newPlaceSelector,
);

const handleNewPlaceForm = () => {
  newPlacePopup.open();
};

addButton.addEventListener("click", handleNewPlaceForm);

//Crear clases FormValidator

editProfileFormValidation.enableValidation();
newPlaceFormValidation.enableValidation();
editAvatarFormValidation.enableValidation();
