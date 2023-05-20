let editButton = document.querySelector(".profile__edit-button");
let editForm = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close");
let name = document.querySelector(".profile__text");
let status = document.querySelector(".profile__status");
let nameForm = document.querySelector(".popup__input_type_name");
let statusForm = document.querySelector(".popup__input_type_status");
let saveButton = document.querySelector(".popup__button");



function fillForm () {
  nameForm.value = name.innerText;
  statusForm.value = status.innerText;
}

fillForm();

function fillFormOut(evt) {
  evt.preventDefault();
  name.textContent = nameForm.value;
  status.textContent = statusForm.value;
  closeEdit();
}

function openEdit () {
  editForm.classList.toggle('popup_opened');
}

function closeEdit () {
  editForm.classList.toggle('popup_opened');
}

editButton.addEventListener('click', openEdit);
closeButton.addEventListener('click', closeEdit);
saveButton.addEventListener('click', fillFormOut);
