let container = document.querySelector(".content");

let profile = container.querySelector(".content__profile");
let profileName = profile.querySelector(".profile__name");
let profileOccupation = profile.querySelector(".profile__occupation");

let editButton = profile.querySelector(".profile__edit-button");
let addButton = profile.querySelector(".profile__add-button");

let elementsContainer = container.querySelector(".content__elements");

function deleteCard(item) {
  const deleteButton = item.querySelector(".elements__btn-delete");
  deleteButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    item.remove();
  });
}

/* Función que añade nuevas tarjetas al grid,
ya sea al incio o al final dependiendo del parametro especificado.*/
function newCard(name, link, position = "append") {
  const cardsTemplate = document.querySelector("#card-template").content;
  const cardElement = cardsTemplate
    .querySelector(".elements__card")
    .cloneNode(true);
  cardElement.querySelector(".elements__image").setAttribute("alt", name);
  cardElement.querySelector(".elements__text").textContent = name;
  cardElement.querySelector(".elements__image").setAttribute("src", link);
  position === "append"
    ? elementsContainer.append(cardElement)
    : elementsContainer.prepend(cardElement);

  deleteCard(cardElement);
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
  newCard(name, link);
});

//Funciones popup

function openP(popupName) {
  popupName.classList.add("page__popup_popup_opened");
}

function closeP(popupName) {
  popupName.classList.remove("page__popup_popup_opened");
}

// popup Editar perfil

let popupEditProfile = document.querySelector("#popup-editprofile");
let closeEditProfile = popupEditProfile.querySelector(".popup__close");

let nameInput = popupEditProfile.querySelector("#input-nombre");
let jobInput = popupEditProfile.querySelector("#input-aboutme");

editButton.addEventListener("click", () => {
  openP(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
});

closeEditProfile.addEventListener("click", () => closeP(popupEditProfile));

let formSaveInfo = popupEditProfile.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closeP(popupEditProfile);
}
formSaveInfo.addEventListener("submit", handleProfileFormSubmit);

//popup Nuevo lugar

let popupNewPlace = document.querySelector("#popup-newplace");
let closeNewPlace = popupNewPlace.querySelector(".popup__close");

let titleInput = popupNewPlace.querySelector("#input-titulo");
let linkInput = popupNewPlace.querySelector("#input-enlace");

addButton.addEventListener("click", () => openP(popupNewPlace));
closeNewPlace.addEventListener("click", () => closeP(popupNewPlace));

let formCreateSubmit = popupNewPlace.querySelector(".popup__form");

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  newCard(titleInput.value, linkInput.value, "prepend");
  titleInput.value = null;
  linkInput.value = null;
  closeP(popupNewPlace);
}

formCreateSubmit.addEventListener("submit", handleNewPlaceFormSubmit);
