import Section from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import '../pages/index.css';
import { validationConfig } from "../utils/Constants.js";
import Api from "../components/Api.js";
import { elements } from "../components/Api.js";
import { elementsTamplate } from "../components/Api.js";


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


const popupFull = new PopupWithImage(popupFullSelector);
popupFull.setEventListeners();
const formAddCard = new PopupWithForm(popupAddCardSelector, addCard);
formAddCard.setEventListeners();
const popupEditProfile = new PopupWithForm (popupEditProfileselector, submitFormEditProfile);
popupEditProfile.setEventListeners();
const formEditProfile = new UserInfo(nameProfile, statusProfile);


function submitFormEditProfile(data) {
  formEditProfile.setUserInfo(data);
  api.setUserInfo(inputsFormEditProfile.userName.value, inputsFormEditProfile.userStatus.value);
  popupEditProfile.close();
}


buttonEditProfile.addEventListener('click', function () {
  const userInfo = formEditProfile.getUserInfo();
  inputsFormEditProfile.userName.value = userInfo.userName;
  inputsFormEditProfile.userStatus.value = userInfo.userStatus;
  popupEditProfile.open();
});

export function newCard(item, elementsTamplate, handleCardClick) {
  const card = new Card(item, elementsTamplate, handleCardClick);
  return card;
}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77/',
  headers: {
    authorization: '4f7a38de-897b-4509-9e7c-9545688bcefc',
    'Content-Type': 'application/json'
  }
})

api.getInitialCards();
api.getUserInfo();



function addCard(data) {

  data.name = data.title;
  api.setNewCard(data);
  const cardList = new Section({items: data, renderer: (item) => {
    const card = newCard(item, elementsTamplate, handleCardClick);
    const cardElement = card.generateCard();

    cardList.addItemPrepend(cardElement);
  }
}, elements);

cardList.renderer();

  formAddCard.close();

  cardFormValidator.resetValidation();
}

buttonAddCard.addEventListener('click', function () {
  formAddCard.open();
});


export function handleCardClick(name, link) {
  popupFull.open(name, link);
}


const cardFormValidator = new FormValidator(validationConfig, formAddCardSelector);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, formEditProfileSelector);
profileFormValidator.enableValidation();





