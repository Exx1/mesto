const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupAddCard = document.querySelector(".popup-add-card");
const popupFormAddCard = document.querySelector(".popup__form_add-card");
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
const popupFull = document.querySelector('.popup-image');
const popupFullImage = document.querySelector('.popup__image');
const popupFullImageText = document.querySelector('.popup__text_image')
const elementTamplate = document.querySelector('#elements_template').content;
const elements = document.querySelector('.elements');


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function fillFormEditProfile() {
  nameFormEditProfile.value = nameProfile.innerText;
  statusFormEditProfile.value = statusProfile.innerText;
}

function outFormEditProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameFormEditProfile.value;
  statusProfile.textContent = statusFormEditProfile.value;
  closePopup(popupEditProfile);
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

function createCard(element) {
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    toggleLike(evt);
  });

  element.querySelector('.element__trash').addEventListener('click', function (evt) {
    deleteCard(evt)
  });

  element.querySelector('.element__image').addEventListener('click', function () {
    popupFullImage.src = element.querySelector('.element__image').src;
    popupFullImage.alt = element.querySelector('.element__name').textContent;
    popupFullImageText.textContent = element.querySelector('.element__name').textContent;
    openPopup(popupFull);
  });

  buttonCloseFullImage.addEventListener('click', function () {
    closePopup(popupFull);
  })
}

function renderCard(element, position) {
  position === 'append' ? elements.append(element) : elements.prepend(element);
}

initialCards.forEach(card => {
  const element = elementTamplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = card.link;
  element.querySelector('.element__image').alt = card.name;
  element.querySelector('.element__name').textContent = card.name;

  createCard(element);

  renderCard(element, 'append');
});


function addCard(evt) {
  evt.preventDefault();
  const element = elementTamplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = linkFormAddCard.value;
  element.querySelector('.element__image').alt = titleFormAddCard.value;
  element.querySelector('.element__name').textContent = titleFormAddCard.value;

  createCard(element);

  renderCard(element, 'prepend');

  closePopup(popupAddCard);

  popupFormAddCard.reset();
}


buttonEditProfile.addEventListener('click', function() {
  fillFormEditProfile();
  openPopup(popupEditProfile);
});

buttonCloseEditProfile.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', outFormEditProfile);

buttonAddCard.addEventListener('click', function() {
  openPopup(popupAddCard);
});
buttonCloseAddCard.addEventListener('click', function() {
  closePopup(popupAddCard);
});

formAddCard.addEventListener('submit', addCard);
