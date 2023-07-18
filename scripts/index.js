const popups = Array.from(document.querySelectorAll('.popup'));
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
  setEventListenersClosePopup(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  setRemoveEventListenersClosePopup(popup);
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

function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

function createCard(name, link) {
  const element = elementTamplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image')

  elementImage.src = link;
  elementImage.alt = name;
  element.querySelector('.element__name').textContent = name;

  element.querySelector('.element__like').addEventListener('click', function (evt) {
    toggleLike(evt);
  });

  element.querySelector('.element__trash').addEventListener('click', function (evt) {
    deleteCard(evt)
  });

  element.querySelector('.element__image').addEventListener('click', function () {
    popupFullImage.src = link;
    popupFullImage.alt = name;
    popupFullImageText.textContent = name;
    openPopup(popupFull);
  });

  return element;

}

function renderCard(element, position) {
  position === 'append' ? elements.append(element) : elements.prepend(element);
}

initialCards.forEach(card => {
  const link = card.link;
  const name = card.name;
  const position = 'append';

  renderCard(createCard(name, link), position);
});


function addCard(evt) {
  evt.preventDefault();

  const link = inputLinkFormAddCard.value;
  const name = inputTitleFormAddCard.value;
  const position = 'prepend';
  const popupButton = popupFormAddCard.querySelector('.popup__button');

  renderCard(createCard(name, link), position);

  closePopup(popupAddCard);

  popupFormAddCard.reset();

  popupButton.disabled = true;
  popupButton.classList.remove("popup__button_type_active");
}

buttonEditProfile.addEventListener('click', function () {
  fillFormEditProfile();
  disableSubmitButton(popupEditProfile);
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

function setEventListenersClosePopup(popup) {
  popup.addEventListener("click", function closePopupClickOverlay(evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
  document.addEventListener("keydown", function closePopupKeydownEsc(evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  })
};

function setRemoveEventListenersClosePopup(popup) {
  popup.removeEventListener("click", function closePopupClickOverlay(evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
  document.removeEventListener("keydown", function closePopupKeydownEsc(evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  })
};

