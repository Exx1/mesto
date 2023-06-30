const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupAddCard = document.querySelector(".popup-add-card");
const buttonCloseEditProfile = document.querySelector(".popup__close_edit");
const buttonCloseAddCard = document.querySelector(".popup__close_add");
const buttonCloseFullImage = document.querySelector(".popup__close_image");
const nameProfile = document.querySelector(".profile__text");
const statusProfile = document.querySelector(".profile__status");
const nameFormEditProfile = document.querySelector(".popup__input_type_name");
const statusFormEditProfile = document.querySelector(".popup__input_type_status");
const titleFormAddCard = document.querySelector(".popup__input_type_title");
const linkFormAddCard = document.querySelector(".popup__input_type_link");
const formEditProfile = document.querySelector(".popup__form_edit-profile");
const formAddCard = document.querySelector(".popup__form_add-card");
const buttonAddCard = document.querySelector('.profile__button-add-card');
const popupFullImage = document.querySelector('.popup__image');
const popupFullImageText = document.querySelector('.popup__text_image')
const elementTamplate = document.querySelector('#elements_template').content;
const elements = document.querySelector('.elements');





buttonEditProfile.addEventListener('click', function() {
  fillForm();
  openPopup(popupEditProfile);
});

buttonCloseEditProfile.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', fillFormOut);

buttonAddCard.addEventListener('click', function() {
  openPopup(popupAddCard);
});
buttonCloseAddCard.addEventListener('click', function() {
  closePopup(popupAddCard);
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function fillForm() {
  nameFormEditProfile.value = nameProfile.innerText;
  statusFormEditProfile.value = statusProfile.innerText;
}

function fillFormOut(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameFormEditProfile.value;
  statusProfile.textContent = statusFormEditProfile.value;
  closePopup(popupEditProfile);
}


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



initialCards.forEach(card => {
  const element = elementTamplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = card.link;
  element.querySelector('.element__image').alt = card.name;
  element.querySelector('.element__name').textContent = card.name;

  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  element.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  element.querySelector('.element__image').addEventListener('click', function (evt) {
    popupFullImage.src = element.querySelector('.element__image').src;
    popupFullImageText.textContent = element.querySelector('.element__name').textContent;
    document.querySelector('.popup-image').classList.add('popup_opened');
  });

  buttonCloseFullImage.addEventListener('click', function () {
    document.querySelector('.popup-image').classList.remove('popup_opened');
  })

  elements.append(element);

});

function addCard(evt) {
  evt.preventDefault();
  const element = elementTamplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = linkFormAddCard.value;
  element.querySelector('.element__image').alt = titleFormAddCard.value;
  element.querySelector('.element__name').textContent = titleFormAddCard.value;

  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  element.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  element.querySelector('.element__image').addEventListener('click', function (evt) {
    popupFullImage.src = element.querySelector('.element__image').src;
    popupFullImageText.textContent = element.querySelector('.element__name').textContent;
    document.querySelector('.popup-image').classList.add('popup_opened');
  });

  buttonCloseFullImage.addEventListener('click', function () {
    document.querySelector('.popup-image').classList.remove('popup_opened');
  })

  elements.prepend(element);

  closePopup(popupAddCard);

  linkFormAddCard.value = '';
  titleFormAddCard.value = '';
}

formAddCard.addEventListener('submit', addCard);
