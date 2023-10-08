import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";

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
const nameProfile = document.querySelector(".profile__text");
const statusProfile = document.querySelector(".profile__status");
const inputNameFormEditProfile = document.querySelector(".popup__input_type_name");
const inputStatusFormEditProfile = document.querySelector(".popup__input_type_status");
const inputTitleFormAddCard = document.querySelector(".popup__input_type_title");
const inputLinkFormAddCard = document.querySelector(".popup__input_type_link");
const formEditProfile = document.querySelector(".popup__form_edit-profile");
const formAddCard = document.querySelector(".popup__form_add-card");
const buttonAddCard = document.querySelector('.profile__button-add-card');
const popupFullSelector = '.popup-image';
const elements = '.elements';



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

const popupFull = new PopupWithImage(popupFullSelector);

const cardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, '#elements_template', handleCardClick);
  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
}}, elements);

cardList.renderer();



function addCard(evt) {
  evt.preventDefault();

  const data = [{
    name: inputTitleFormAddCard.value,
    link: inputLinkFormAddCard.value
  }];

  const cardNew = new Section({items: data, renderer: (item) => {
    const card = new Card(item, '#elements_template', handleCardClick);
    const cardElement = card.generateCard();

    cardList.addItemPrepend(cardElement);
  }}, elements);

  cardNew.renderer();

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



formAddCard.addEventListener('submit', addCard);

function handleCardClick(name, link) {
  popupFull.open(name, link);
}

const cardFormValidator = new FormValidator(validationConfig, formAddCard);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, formEditProfile);
profileFormValidator.enableValidation();
