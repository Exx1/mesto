let editButton = document.querySelector(".profile__edit-button");
let editForm = document.querySelector(".edit");
let closeButton = document.querySelector(".edit__close");
let name = document.querySelector(".profile__text");
let status = document.querySelector(".profile__status");
let nameForm = document.querySelector("[name='name']");
let statusForm = document.querySelector("[name='status']");
let saveButton = document.querySelector(".edit__button");



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
  editForm.classList.toggle('edit_active');
}

function closeEdit () {
  editForm.classList.toggle('edit_active');
}

editButton.addEventListener('click', openEdit);
closeButton.addEventListener('click', closeEdit);
saveButton.addEventListener('click', fillFormOut);
