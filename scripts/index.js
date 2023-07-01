const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupAddCard = document.querySelector(".popup-add-card");
const popupFormAddCard = document.querySelector(".popup__form_add-card");
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
const elementTamplate = document.querySelector('#elements_template').content;
const elements = document.querySelector('.elements');


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function fillFormEditProfile() {
  inputNameFormEditProfile.value = nameProfile.innerText;
  inputStatusFormEditProfile.value = statusProfile.innerText;
}

function outFormEditProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = inputNameFormEditProfile.value;
  statusProfile.textContent = inputStatusFormEditProfile.value;
  closePopup(popupEditProfile);
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

function createCard(name, link, position) {
  const element = elementTamplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__image').src = link;
  element.querySelector('.element__image').alt = name;
  element.querySelector('.element__name').textContent = name;

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

  renderCard(element, position);
}

function renderCard(element, position) {
  position === 'append' ? elements.append(element) : elements.prepend(element);
}

initialCards.forEach(card => {
  const link = card.link;
  const name = card.name;
  const position = 'append';

  createCard(name, link, position);
});


function addCard(evt) {
  evt.preventDefault();

  const link = inputLinkFormAddCard.value;
  const name = inputTitleFormAddCard.value;
  const position = 'prepend';

  createCard(name, link, position);

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

buttonCloseFullImage.addEventListener('click', function () {
  closePopup(popupFull);
})

formAddCard.addEventListener('submit', addCard);
