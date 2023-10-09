import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  activeButtonClass: 'popup__button_type_active',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = ".popup-edit-profile";
const popupAddCardSelector = ".popup-add-card";
const buttonCloseEditProfile = document.querySelector(".popup__close_edit");
const buttonCloseAddCard = document.querySelector(".popup__close_add");
const nameProfile = ".profile__text";
const statusProfile = ".profile__status";
const inputNameFormEditProfile = ".popup__input_type_name";
const inputStatusFormEditProfile = ".popup__input_type_status";
const formEditProfileSelector = document.querySelector(".popup__form_edit-profile");
const buttonAddCard = document.querySelector('.profile__button-add-card');
const formAddCardSelector = document.querySelector(".popup__form_add-card");
const popupFullSelector = '.popup-image';
const elements = '.elements';


const popupFull = new PopupWithImage(popupFullSelector);
const formAddCard = new PopupWithForm(popupAddCardSelector, addCard);
const formEditProfile = new UserInfo(popupEditProfile, inputNameFormEditProfile, inputStatusFormEditProfile, nameProfile, statusProfile);

formEditProfileSelector.addEventListener('submit', function (evt)  {
  evt.preventDefault();

  formEditProfile.setUserInfo();
formEditProfile.close();
})


buttonEditProfile.addEventListener('click', function () {
  formEditProfile.getUserInfo();
  formEditProfile.open();
});

buttonCloseEditProfile.addEventListener('click', function () {
  formEditProfile.close();
});


const cardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, '#elements_template', handleCardClick);
  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
}}, elements);

cardList.renderer();



function addCard(data) {

  const cardNew = new Section({items: data, renderer: (item) => {
    const card = new Card(item, '#elements_template', handleCardClick);
    const cardElement = card.generateCard();

    cardList.addItemPrepend(cardElement);
  }}, elements);

  cardNew.renderer();

  formAddCard.close();

  cardFormValidator.resetValidation();
}

buttonAddCard.addEventListener('click', function () {
  formAddCard.open();
});
buttonCloseAddCard.addEventListener('click', function () {
  formAddCard.close();
});


function handleCardClick(name, link) {
  popupFull.open(name, link);
}

const cardFormValidator = new FormValidator(validationConfig, formAddCardSelector);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, formEditProfileSelector);
profileFormValidator.enableValidation();
