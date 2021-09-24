const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting #name");
const idForm = document.querySelector("#todo-form");
const editButton = document.querySelector("#edit-button");

const time = document.querySelector("#greeting #time");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
const hours = new Date();
const savedUsername = localStorage.getItem(USERNAME_KEY);

function getTime(hours) {
  console.log(hours);
  if (hours >= 22) {
    time.innerText = "Good night,";
  } else if (hours >= 18) {
    time.innerText = "Good eveing,";
  } else if (hours >= 12) {
    time.innerText = "Good afternoon,";
  } else {
    time.innerText = "Good morning,";
  }
}

function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  loginForm.classList.add(HIDDEN_CLASSNAME);
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.innerText = `${username}`;
  idForm.classList.remove(HIDDEN_CLASSNAME);
  editButton.classList.remove(HIDDEN_CLASSNAME);
}

function renderInput(name) {
  const input = document.createElement("input");
  input.value = name;
  input.id = "desc";
  return input;
}

function renderSpan(name) {
  const span = document.createElement("span");
  span.id = "name";
  span.innerText = name;
  return span;
}
function mouseEnter() {
  editButton.innerText = "Edit Name";
}
function mouseDown() {
  editButton.innerHTML = "&nbsp &nbsp";
}
function makeInput(e) {
  const target = e.target.previousElementSibling.lastChild;
  if (target.id === "name") {
    target.parentElement.replaceChild(renderInput(target.innerText), target);
    desc.addEventListener("keyup", changeName);
  }
}

function changeName(event) {
  const target = event.target;
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    localStorage.setItem(USERNAME_KEY, event.target.value);
    target.parentElement.replaceChild(renderSpan(event.target.value), target);
  }
}

editButton.addEventListener("mouseenter", mouseEnter);
editButton.addEventListener("mouseleave", mouseDown);
editButton.addEventListener("click", makeInput);

if (savedUsername === null) {
  greeting.innerText = "lovely";
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
  editButton.classList.add(HIDDEN_CLASSNAME);
} else {
  paintGreetings(savedUsername);
}

getTime(hours.getHours());