let editButton = document.querySelector(".profile__edit-button");
let editForm = document.querySelector(".popup-edit");
let addForm = document.querySelector(".popup-add");
let closeButtonEdit = document.querySelector(".popup__close_edit");
let closeButtonAdd = document.querySelector(".popup__close_add");
let name = document.querySelector(".profile__text");
let status = document.querySelector(".profile__status");
let nameForm = document.querySelector(".popup__input_type_name");
let statusForm = document.querySelector(".popup__input_type_status");
let titleForm = document.querySelector(".popup__input_type_title");
let linkForm = document.querySelector(".popup__input_type_link");
let form = document.querySelector(".popup__form");
let formAdd = document.querySelector(".popup__form_add");
let addButton = document.querySelector('.profile__add-button');



function fillForm () {
  nameForm.value = name.innerText;
  statusForm.value = status.innerText;
}

function fillFormOut(evt) {
  evt.preventDefault();
  name.textContent = nameForm.value;
  status.textContent = statusForm.value;
  toggleEdit();
}

function toggleEdit () {
  if (editForm.classList.contains('popup_opened')) {
    editForm.classList.toggle('popup_opened')
  } else {
    editForm.classList.toggle('popup_opened');
    fillForm();
  }
}

function toggleAdd () {
    addForm.classList.toggle('popup_opened');
}

editButton.addEventListener('click', toggleEdit);
closeButtonEdit.addEventListener('click', toggleEdit);
form.addEventListener('submit', fillFormOut);
addButton.addEventListener('click', toggleAdd);
closeButtonAdd.addEventListener('click', toggleAdd);

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

  elements.append(element);
});

function addCard (evt) {
  evt.preventDefault();
  const element = elementTamplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = linkForm.value;
  element.querySelector('.element__image').alt = titleForm.value;
  element.querySelector('.element__name').textContent = titleForm.value;

  elements.prepend(element);
  toggleAdd();
}

formAdd.addEventListener('submit', addCard);
