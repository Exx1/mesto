import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  activeButtonClass: 'popup__button_type_active',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupAddCard = document.querySelector(".popup-add-card");
const buttonCloseEditProfile = document.querySelector(".popup__close_edit");
const buttonCloseAddCard = document.querySelector(".popup__close_add");
const buttonCloseFullImage = document.querySelector(".popup__close_image");
const nameProfile = document.querySelector(".profile__text");
const statusProfile = document.querySelector(".profile__status");
const inputNameFormEditProfile = document.querySelector(".popup__input_type_name");
const inputStatusFormEditProfile = document.querySelector(".popup__input_type_status");
const inputTitleFormAddCard = document.querySelector(".popup__input_type_title");
const inputLinkFormAddCard = document.querySelector(".popup__input_type_link");
const formEditProfile = document.querySelector(".popup__form_edit-profile");
const formAddCard = document.querySelector(".popup__form_add-card");
const buttonAddCard = document.querySelector('.profile__button-add-card');
const popupFull = document.querySelector('.popup-image');
const popupFullImage = document.querySelector('.popup__image');
const popupFullImageText = document.querySelector('.popup__text_image')
const elements = document.querySelector('.elements');



function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupClickOverlay);
  document.addEventListener('keydown', closePopupKeydownEsc);
}

function closePopup(popup) {
  popup.removeEventListener('click', closePopupClickOverlay);
  document.removeEventListener('keydown', closePopupKeydownEsc);
  popup.classList.remove('popup_opened');
}

function fillFormEditProfile() {
  inputNameFormEditProfile.value = nameProfile.innerText;
  inputStatusFormEditProfile.value = statusProfile.innerText;
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = inputNameFormEditProfile.value;
  statusProfile.textContent = inputStatusFormEditProfile.value;
  closePopup(popupEditProfile);
}

function generateCard(item) {
  const card = new Card(item, '#elements_template', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

function renderCard(element, position) {
  position === 'append' ? elements.append(element) : elements.prepend(element);
}

initialCards.forEach((item) => {
  const position = 'append';

  renderCard(generateCard(item), position);
});


function addCard(evt) {
  evt.preventDefault();

  const data = {
    link: inputLinkFormAddCard.value,
    name: inputTitleFormAddCard.value,
  }

  const position = 'prepend';

  renderCard(generateCard(data), position);

  closePopup(popupAddCard);

  formAddCard.reset();

  cardFormValidator.resetValidation();
}

buttonEditProfile.addEventListener('click', function () {
  fillFormEditProfile();
  openPopup(popupEditProfile);
});

buttonCloseEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', submitEditProfileForm);

buttonAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});
buttonCloseAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});

buttonCloseFullImage.addEventListener('click', function () {
  closePopup(popupFull);
})

formAddCard.addEventListener('submit', addCard);

function closePopupClickOverlay(evt) {
  const popup = evt.currentTarget;
  if (evt.target === popup) {
    closePopup(popup);
  }
}

function closePopupKeydownEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function handleCardClick(name, link) {
  popupFullImage.src = link;
  popupFullImage.alt = name;
  popupFullImageText.textContent = name;

  openPopup(popupFull);
}

const cardFormValidator = new FormValidator(validationConfig, formAddCard);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, formEditProfile);
profileFormValidator.enableValidation();
