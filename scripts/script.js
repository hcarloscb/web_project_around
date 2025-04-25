let container = document.querySelector(".content");

let profile = container.querySelector(".content__profile");
let profileName = profile.querySelector(".profile__name");
let profileOccupation = profile.querySelector(".profile__occupation");

let editButton = profile.querySelector(".profile__edit-button");

let pagePopup = document.querySelector(".page__popup");
let closeButton = pagePopup.querySelector(".popup__close");

let nameInput = pagePopup.querySelector("#input-nombre");
let jobInput = pagePopup.querySelector("#input-aboutme");

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
