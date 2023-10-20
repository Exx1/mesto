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
import renderLoading from "../utils/utils.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfileselector = ".popup-edit-profile";
const popupAddCardSelector = ".popup-add-card";
const user = {
  name: ".profile__text",
  status: ".profile__status",
  avatar: '.profile__avatar'
}
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
const popupEditAvatarSelector = '.popup-edit-avatar';
const elements = '.elements';
const elementsTamplate = '#elements_template';
const submitButtonEditProfile = document.querySelector('.popup__button_edit-profile');
const submitButtonAddCard = document.querySelector('.popup__button_add-card');
const submitButtonEditAvatar = document.querySelector('.popup__button_edit-avatar');

const popupFull = new PopupWithImage(popupFullSelector);
popupFull.setEventListeners();
const formAddCard = new PopupWithForm(popupAddCardSelector, addCard);
formAddCard.setEventListeners();
const popupEditProfile = new PopupWithForm(popupEditProfileselector, submitFormEditProfile);
popupEditProfile.setEventListeners();
const formEditProfile = new UserInfo(user.name, user.status);
const popupDeleteCard = new Popup(popupDeleteCardSelector);
popupDeleteCard.setEventListeners();
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, submitFormEditAvatar);
popupEditAvatar.setEventListeners();
const cardList = new Section({}, elements);

buttonEditAvatar.addEventListener('click', function () {
  popupEditAvatar.open();
})

function submitFormEditAvatar(data) {
  renderLoading(submitButtonEditAvatar);
  api.setAvatar(data.link)
    .then((res) => {
      document.querySelector(user.avatar).src = res.avatar;
      popupEditAvatar.close();
      renderLoading(submitButtonEditAvatar);
      editAvatarFormValidator.resetValidation();
    })

    .catch((err) => {
      console.log(err);
    });
}

function submitFormEditProfile(data) {
  renderLoading(submitButtonEditProfile);
  formEditProfile.setUserInfo(data);
  api.setUserInfo(inputsFormEditProfile.userName.value, inputsFormEditProfile.userStatus.value)
    .then(() => {
      popupEditProfile.close();
      renderLoading(submitButtonEditProfile);
    })

    .catch((err) => {
      console.log(err);
    });
}

buttonEditProfile.addEventListener('click', function () {
  const userInfo = formEditProfile.getUserInfo();
  inputsFormEditProfile.userName.value = userInfo.userName;
  inputsFormEditProfile.userStatus.value = userInfo.userStatus;
  popupEditProfile.open();
});

function createCard(item, elementsTamplate, handleCardClick) {
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

api.getUserInfo()
  .then((res) => {
    document.querySelector(user.name).textContent = res.name;
    document.querySelector(user.status).textContent = res.about;
    document.querySelector(user.avatar).src = res.avatar;
    user.id = res._id;
  })

  .catch((err) => {
    console.log(err);
  });

api.getInitialCards()
  .then((res) => {

    const cardList = new Section({
      items: res, renderer: (item) => {
        const card = createCard(item, elementsTamplate, {
          open: openCardClick,
          openPopupDeleteCard: openPopupDeleteCard,
          deleteCard: deleteCard,
          addLike: addLike,
          deleteLike: deleteLike
        });
        const cardElement = card.generateCard();
        card.hideTrashIcon(item.owner._id, user.id);

        if (item.likes.length > 0) {
          item.likes.forEach(item => {
            if (item._id === user.id) {
              cardElement.querySelector('.element__like').classList.add('element__like_active');
            }
          });
        }
        cardElement.id = item._id;
        cardList.addItem(cardElement);
      }
    }, elements);

    cardList.renderItems();
  })

  .catch((err) => {
    console.log(err);
  });

function addCard(data) {
  renderLoading(submitButtonAddCard);
  api.setNewCard(data)
    .then((res) => {
      const card = createCard(res, elementsTamplate, {
        open: openCardClick,
        openPopupDeleteCard: openPopupDeleteCard,
        deleteCard: deleteCard,
        addLike: addLike,
        deleteLike: deleteLike
      }
      );
      const cardElement = card.generateCard();
      card.hideTrashIcon(res.owner._id, user.id);

      cardElement.id = res._id;

      cardList.addItemPrepend(cardElement);
      renderLoading(submitButtonAddCard);
    }
    )

    .catch((err) => {
      console.log(err);
    });

  formAddCard.close();

  cardFormValidator.resetValidation();
}

buttonAddCard.addEventListener('click', function () {
  formAddCard.open();
});

function openCardClick(name, link) {
  popupFull.open(name, link)
}

function openPopupDeleteCard(func) {
  popupDeleteCard.open();
  document.querySelector(popupDeleteCardSelector).querySelector('.popup__button-delete').addEventListener('click', func);
}

function deleteCard(id, func) {
  api.deleteCard(id)
    .catch((err) => {
      console.log(err);
    });
  popupDeleteCard.close();
  document.querySelector(popupDeleteCardSelector).querySelector('.popup__button-delete').removeEventListener('click', func);
}

function addLike(element) {
  api.addLikeCard(element)
    .then((res) => {
      element.querySelector('.element__like-counter').textContent = res.likes.length;
    })

    .catch((err) => {
      console.log(err);
    });
}

function deleteLike(element) {
  api.deleteLikeCard(element)
    .then((res) => {
      element.querySelector('.element__like-counter').textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

const cardFormValidator = new FormValidator(validationConfig, formAddCardSelector);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, formEditProfileSelector);
profileFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(validationConfig, formEditAvatarSelector);
editAvatarFormValidator.enableValidation();





