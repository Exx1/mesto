let editButton = document.querySelector(".profile__edit-button");
let editForm = document.querySelector(".popup-edit");
let addForm = document.querySelector(".popup-add");
let closeButtonEdit = document.querySelector(".popup__close_edit");
let closeButtonAdd = document.querySelector(".popup__close_add");
let closeButtonImage = document.querySelector(".popup__close_image");
let name = document.querySelector(".profile__text");
let status = document.querySelector(".profile__status");
let nameForm = document.querySelector(".popup__input_type_name");
let statusForm = document.querySelector(".popup__input_type_status");
let titleForm = document.querySelector(".popup__input_type_title");
let linkForm = document.querySelector(".popup__input_type_link");
let form = document.querySelector(".popup__form");
let formAdd = document.querySelector(".popup__form_add");
let addButton = document.querySelector('.profile__add-button');
let popupImage = document.querySelector('.popup__image');
let popupTextImage = document.querySelector('.popup__text_image')



function fillForm() {
  nameForm.value = name.innerText;
  statusForm.value = status.innerText;
}

function fillFormOut(evt) {
  evt.preventDefault();
  name.textContent = nameForm.value;
  status.textContent = statusForm.value;
  toggleEdit();
}

function toggleEdit() {
  if (editForm.classList.contains('popup_opened')) {
    editForm.classList.toggle('popup_opened')
  } else {
    editForm.classList.toggle('popup_opened');
    fillForm();
  }
}

function togglePopup() {
  addForm.classList.toggle('popup_opened');
}

editButton.addEventListener('click', toggleEdit);
closeButtonEdit.addEventListener('click', toggleEdit);
form.addEventListener('submit', fillFormOut);
addButton.addEventListener('click', togglePopup);
closeButtonAdd.addEventListener('click', togglePopup);

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

const elementTamplate = document.querySelector('#elements_template').content;
const elements = document.querySelector('.elements');

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
    popupImage.src = element.querySelector('.element__image').src;
    popupTextImage.textContent = element.querySelector('.element__name').textContent;
    document.querySelector('.popup-image').classList.add('popup_opened');
  });

  document.querySelector('.popup__close_image').addEventListener('click', function () {
    document.querySelector('.popup-image').classList.remove('popup_opened');
  })

  elements.append(element);

});

function addCard(evt) {
  evt.preventDefault();
  const element = elementTamplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = linkForm.value;
  element.querySelector('.element__image').alt = titleForm.value;
  element.querySelector('.element__name').textContent = titleForm.value;

  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  element.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  element.querySelector('.element__image').addEventListener('click', function (evt) {
    popupImage.src = element.querySelector('.element__image').src;
    popupTextImage.textContent = element.querySelector('.element__name').textContent;
    document.querySelector('.popup-image').classList.add('popup_opened');
  });

  document.querySelector('.popup__close_image').addEventListener('click', function () {
    document.querySelector('.popup-image').classList.remove('popup_opened');
  })

  elements.prepend(element);

  togglePopup();

  linkForm.value = '';
  titleForm.value = '';
}

formAdd.addEventListener('submit', addCard);
