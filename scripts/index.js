let container = document.querySelector(".content");

let profile = container.querySelector(".content__profile");
let profileName = profile.querySelector(".profile__name");
let profileOccupation = profile.querySelector(".profile__occupation");

let editButton = profile.querySelector(".profile__edit-button");

let pagePopup = document.querySelector(".page__popup");
let closeButton = pagePopup.querySelector(".popup__close");

let nameInput = pagePopup.querySelector("#input-nombre");
let jobInput = pagePopup.querySelector("#input-aboutme");

let elementsContainer = container.querySelector(".content__elements");

function addCard(name, link) {
  const cardsTemplate = document.querySelector("#card-template").content;
  const cardElement = cardsTemplate
    .querySelector(".elements__card")
    .cloneNode(true);
  cardElement.querySelector(".elements__image").setAttribute("src", link);
  cardElement.querySelector(".elements__image").setAttribute("alt", name);
  cardElement.querySelector(".elements__text").textContent = name;
  elementsContainer.append(cardElement);
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
  addCard(name, link);
});

function openPopup() {
  pagePopup.classList.add("page__popup_popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
}
editButton.addEventListener("click", openPopup);

function closePopup() {
  pagePopup.classList.remove("page__popup_popup_opened");
}
closeButton.addEventListener("click", closePopup);

let formElement = pagePopup.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener("submit", handleProfileFormSubmit);
