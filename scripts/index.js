let editButton = document.querySelector(".profile__edit-button");
let editForm = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close");
let name = document.querySelector(".profile__text");
let status = document.querySelector(".profile__status");
let nameForm = document.querySelector(".popup__input_type_name");
let statusForm = document.querySelector(".popup__input_type_status");
let form = document.querySelector(".popup__form");



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

editButton.addEventListener('click', toggleEdit);
closeButton.addEventListener('click', toggleEdit);
form.addEventListener('submit', fillFormOut);
