import Section from "../components/Section.js";
import { Card } from "../components/Card.js";
import Popup from "../components/Popup.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import '../pages/index.css';
import { validationConfig } from "../utils/Constants.js";
import Api from "../components/Api.js";


const buttonEditProfile = document.querySelector(".profile__edit-button");
export const popupEditProfileselector = ".popup-edit-profile";
const popupAddCardSelector = ".popup-add-card";
const nameProfile = ".profile__text";
const statusProfile = ".profile__status";
const avatarProfile = document.querySelector('.profile__avatar');
const inputsFormEditProfile = {
  userName: document.querySelector(".popup__input_type_name"),
  userStatus: document.querySelector(".popup__input_type_status")
}
const formEditProfileSelector = document.querySelector(".popup__form_edit-profile");
const buttonAddCard = document.querySelector('.profile__button-add-card');
const formAddCardSelector = document.querySelector(".popup__form_add-card");
const popupFullSelector = '.popup-image';
const popupDeleteCardSelector = '.popup-delete-card';
const formEditAvatarSelector = document.querySelector(".popup__form_edit-avatar");
const buttonEditAvatar = document.querySelector('.profile__avatar-box');
export const popupEditAvatarSelector = '.popup-edit-avatar';
export const elements = '.elements';
export const elementsTamplate = '#elements_template';


const popupFull = new PopupWithImage(popupFullSelector);
popupFull.setEventListeners();
const formAddCard = new PopupWithForm(popupAddCardSelector, addCard);
formAddCard.setEventListeners();
export const popupEditProfile = new PopupWithForm(popupEditProfileselector, submitFormEditProfile);
popupEditProfile.setEventListeners();
const formEditProfile = new UserInfo(nameProfile, statusProfile);
export const popupDeleteCard = new Popup(popupDeleteCardSelector);
popupDeleteCard.setEventListeners();
export const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, submitFormEditAvatar);
popupEditAvatar.setEventListeners();

export function changeTextButtonWaiting(selectorPopup) {
  const popup = document.querySelector(selectorPopup);
  popup.querySelector('.popup__button').textContent = 'Сохранить...';
}

function changeTextButton(selectorPopup) {
  const popup = document.querySelector(selectorPopup);
  popup.querySelector('.popup__button').textContent = 'Сохранить';
}

buttonEditAvatar.addEventListener('click', function() {
  changeTextButton(popupEditAvatarSelector);
  popupEditAvatar.open();
})

function submitFormEditAvatar(data) {
  editAvatarFormValidator.resetValidation();
  api.setAvatar(data.link)
  .then((res) => {
    changeTextButtonWaiting(popupEditAvatarSelector);
    avatarProfile.src = res.avatar;
    popupEditAvatar.close();
  })

  .catch((err) => {
    console.log(err);
  });
}


function submitFormEditProfile(data) {
  formEditProfile.setUserInfo(data);
  api.setUserInfo(inputsFormEditProfile.userName.value, inputsFormEditProfile.userStatus.value)
  .then (() => {
    changeTextButtonWaiting(popupEditProfileselector);
    popupEditProfile.close();
  })

  .catch((err) => {
    console.log(err);
  });
}


buttonEditProfile.addEventListener('click', function () {
  const userInfo = formEditProfile.getUserInfo();
  inputsFormEditProfile.userName.value = userInfo.userName;
  inputsFormEditProfile.userStatus.value = userInfo.userStatus;
  changeTextButton(popupEditProfileselector);
  popupEditProfile.open();
});

export function newCard(item, elementsTamplate, handleCardClick) {
  const card = new Card(item, elementsTamplate, handleCardClick);
  return card;
}


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77/',
  headers: {
    authorization: '4f7a38de-897b-4509-9e7c-9545688bcefc',
    'Content-Type': 'application/json'
  }
})

api.getInitialCards()
.then((res) => {
  const cardList = new Section({
    items: res, renderer: (item) => {
      const card = newCard(item, elementsTamplate, handleCardClick);
      const cardElement = card.generateCard();
      if (item.owner._id !== "8e020bb07b9fb09a45ecdc6f") {
        cardElement.querySelector('.element__trash').style.display = "none";
      }
      if (item.likes.length > 0) {
        item.likes.forEach(item => {
          if (item._id === "8e020bb07b9fb09a45ecdc6f") {
            cardElement.querySelector('.element__like').classList.add('element__like_active');
          }
        });
      }
      cardElement.id = item._id;
      cardList.addItem(cardElement);
    }
  }, elements);

  cardList.renderer();
})

.catch((err) => {
  console.log(err);
});


api.getUserInfo();



function addCard(data) {

  api.setNewCard(data)
  .then((res) => {
    const cardList = new Section({
      items: res, renderer: (item) => {
        const card = newCard(item, elementsTamplate, handleCardClick);
        const cardElement = card.generateCard();

        cardElement.id = item._id;
        cardList.addItemPrepend(cardElement);
      }
    }, elements);

    cardList.renderer();
  })

  .catch((err) => {
    console.log(err);
  });

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

const editAvatarFormValidator = new FormValidator(validationConfig, formEditAvatarSelector);
editAvatarFormValidator.enableValidation();





