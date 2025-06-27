const container = document.querySelector(".content");

const profile = container.querySelector(".content__profile");
const profileName = profile.querySelector(".profile__name");
const profileOccupation = profile.querySelector(".profile__occupation");

const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");

const elementsContainer = container.querySelector(".content__elements");

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

//Funciones popup

function openPopup(popupElement) {
  popupElement.classList.add("page__popup_popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("page__popup_popup_opened");
}

// popup Editar perfil

const popupEditProfile = document.querySelector("#popup-editprofile");
const closeEditProfile = popupEditProfile.querySelector(".popup__close");

const nameInput = popupEditProfile.querySelector("#input-nombre");
const jobInput = popupEditProfile.querySelector("#input-aboutme");

editButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
});

closeEditProfile.addEventListener("click", () => closePopup(popupEditProfile));

const profileForm = popupEditProfile.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

//popup Nuevo lugar

const popupNewPlace = document.querySelector("#popup-newplace");
const closeNewPlace = popupNewPlace.querySelector(".popup__close");

const titleInput = popupNewPlace.querySelector("#input-titulo");
const linkInput = popupNewPlace.querySelector("#input-enlace");

addButton.addEventListener("click", () => openPopup(popupNewPlace));
closeNewPlace.addEventListener("click", () => closePopup(popupNewPlace));

const newPlaceForm = popupNewPlace.querySelector(".popup__form");

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  createCard(titleInput.value, linkInput.value, "prepend");
  titleInput.value = "";
  linkInput.value = "";
  closePopup(popupNewPlace);
}

newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

// Popup vista de imagen
const popupViewImage = document.querySelector("#popup-viewimage");
const closeViewImage = popupViewImage.querySelector(".popup__close");

// Función que permite abrir y cerrar la visualización de una imagen
function viewImage(link, title) {
  const popupImage = popupViewImage.querySelector(".popup__view-image");
  const popupName = popupViewImage.querySelector(".popup__view-title");
  popupImage.setAttribute("src", link);
  popupImage.setAttribute("alt", title);
  popupName.textContent = title;

  closeViewImage.addEventListener("click", () => {
    closePopup(popupViewImage);
    popupImage.setAttribute("src", "");
    popupImage.setAttribute("alt", "");
    popupName.textContent = "";
  });
}
