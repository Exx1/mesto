import { initialCards } from "../utils/cards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import '../pages/index.css';
import { validationConfig } from "../utils/Constants.js";


const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfileselector = ".popup-edit-profile";
const popupAddCardSelector = ".popup-add-card";
const nameProfile = ".profile__text";
const statusProfile = ".profile__status";
const inputsFormEditProfile = {
  userName: document.querySelector(".popup__input_type_name"),
  userStatus: document.querySelector(".popup__input_type_status")
}
const formEditProfileSelector = document.querySelector(".popup__form_edit-profile");
const buttonAddCard = document.querySelector('.profile__button-add-card');
const formAddCardSelector = document.querySelector(".popup__form_add-card");
const popupFullSelector = '.popup-image';
const elements = '.elements';


const popupFull = new PopupWithImage(popupFullSelector);
popupFull.setEventListeners();
const formAddCard = new PopupWithForm(popupAddCardSelector, addCard);
formAddCard.setEventListeners();
const popupEditProfile = new PopupWithForm (popupEditProfileselector, submitFormEditProfile);
popupEditProfile.setEventListeners();
const formEditProfile = new UserInfo(nameProfile, statusProfile);


function submitFormEditProfile(data) {
  formEditProfile.setUserInfo(data);
  popupEditProfile.close();
}


buttonEditProfile.addEventListener('click', function () {
  const userInfo = formEditProfile.getUserInfo();
  inputsFormEditProfile.userName.value = userInfo.userName;
  inputsFormEditProfile.userStatus.value = userInfo.userStatus;
  popupEditProfile.open();
});


const elementsTamplate = '#elements_template';

function newCard(item, elementsTamplate, handleCardClick) {
  const card = new Card(item, elementsTamplate, handleCardClick);
  return card;
}


const cardList = new Section({items: initialCards, renderer: (item) => {
  const card = newCard(item, elementsTamplate, handleCardClick);
  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
}}, elements);

cardList.renderer();



function addCard(data) {
    data.name = data.title;
    const card = newCard(data, elementsTamplate, handleCardClick);
    const cardElement = card.generateCard();

    cardList.addItemPrepend(cardElement);


  formAddCard.close();

  cardFormValidator.resetValidation();
}

buttonAddCard.addEventListener('click', function () {
  formAddCard.open();
});


function handleCardClick(name, link) {
  popupFull.open(name, link);
}


const cardFormValidator = new FormValidator(validationConfig, formAddCardSelector);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, formEditProfileSelector);
profileFormValidator.enableValidation();
