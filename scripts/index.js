let container = document.querySelector(".content");

let profile = container.querySelector(".content__profile");
let profileName = profile.querySelector(".profile__name");
let profileOccupation = profile.querySelector(".profile__occupation");

let editButton = profile.querySelector(".profile__edit-button");
let addButton = profile.querySelector(".profile__add-button");

let elementsContainer = container.querySelector(".content__elements");

// Popup vista de imagen
let popupViewImage = document.querySelector("#popup-viewimage");
let closeViewImage = popupViewImage.querySelector(".popup__close");

// Función que permite abrir y cerrar la visualización de una imagen
function viewImage(link, title) {
  let image = popupViewImage.querySelector(".popup__view-image");
  let name = popupViewImage.querySelector(".popup__view-title");
  image.setAttribute("src", link);
  image.setAttribute("alt", title);
  name.textContent = title;

  closeViewImage.addEventListener("click", () => {
    closePopup(popupViewImage);
    image.setAttribute("src", "");
    image.setAttribute("alt", "");
    name.textContent = "";
  });
}

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

function openPopup(popupName) {
  popupName.classList.add("page__popup_popup_opened");
}

function closePopup(popupName) {
  popupName.classList.remove("page__popup_popup_opened");
}

// popup Editar perfil

let popupEditProfile = document.querySelector("#popup-editprofile");
let closeEditProfile = popupEditProfile.querySelector(".popup__close");

let nameInput = popupEditProfile.querySelector("#input-nombre");
let jobInput = popupEditProfile.querySelector("#input-aboutme");

editButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
});

closeEditProfile.addEventListener("click", () => closePopup(popupEditProfile));

let formSaveInfo = popupEditProfile.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
formSaveInfo.addEventListener("submit", handleProfileFormSubmit);

//popup Nuevo lugar

let popupNewPlace = document.querySelector("#popup-newplace");
let closeNewPlace = popupNewPlace.querySelector(".popup__close");

let titleInput = popupNewPlace.querySelector("#input-titulo");
let linkInput = popupNewPlace.querySelector("#input-enlace");

addButton.addEventListener("click", () => openPopup(popupNewPlace));
closeNewPlace.addEventListener("click", () => closePopup(popupNewPlace));

let formCreateSubmit = popupNewPlace.querySelector(".popup__form");

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  createCard(titleInput.value, linkInput.value, "prepend");
  titleInput.value = "";
  linkInput.value = "";
  closePopup(popupNewPlace);
}

formCreateSubmit.addEventListener("submit", handleNewPlaceFormSubmit);
