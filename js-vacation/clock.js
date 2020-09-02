const Constant = {
  NAME: 'name',
  HOUR: 'hour',
};

const util = {
  getZero: function (value) {
    return value < 10 ? `0${value}` : value;
  },
};

const clockObj = {
  getClock: function () {
    const date = new Date();
    const hour = date.getHours();
    localStorage.setItem(Constant.HOUR, hour);
    return `${util.getZero(hour)}:${util.getZero(
      date.getMinutes()
    )}:${util.getZero(date.getSeconds())}`;
  },
};

const greetingObj = {
  getGreeting: function (name) {
    const greetingType =
      localStorage.getItem(Constant.HOUR) > 17
        ? 'Good evening'
        : localStorage.getItem(Constant.HOUR) > 11
        ? 'Good afternoon'
        : 'Good morning';
    domObj.greeting.innerHTML = `${greetingType}, ${name ? name : 'lovely'}`;
  },
  renderName: function () {
    const h1 = document.createElement('h1');
    h1.innerText = 'What is your name?';
    const form = document.createElement('form');
    form.classList.add('name-form');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'name';
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'Next';
    form.appendChild(input);
    form.appendChild(submit);
    domObj.container.appendChild(h1);
    domObj.container.appendChild(form);
    domObj.nameForm = document.querySelector('.todo-container .name-form');
    domObj.nameForm.onsubmit = domObj.submitHandler;
  },
};

const todoObj = {
  todos: [],
  renderTodo: function () {
    domObj.container.innerHTML = `<h1>What is your main focus for today?</h1>
    <form class="todo-form">
        <input type="text" name="todo" />
    </form>`;
    domObj.todoForm = document.querySelector('.todo-container .todo-form');
    domObj.todoForm.onsubmit = domObj.submitHandler;
  },
};

const domObj = {
  clock: document.querySelector('.clock'),
  greeting: document.querySelector('.greeting'),
  container: document.querySelector('.todo-container'),
  todoForm: '',
  todoInput: document.querySelector('.todo-form input'),
  nameForm: '',
  nameInput: document.querySelector('.name-form input'),

  submitHandler: function (e) {
    e.preventDefault();
    console.log(e.target);
    // todoObj.todos.push(domObj.todoInput.value);
    // console.log(todos);
    // domObj.todoInput.value = '';
    return false;
  },
};

function init() {
  console.log(
    navigator.geolocation.getCurrentPosition(
      function (data) {
        console.log(data);
        const { latitude: lat, longitude: lon } = data.coords;
        const KEY = 'f108f4fedb06a718196682fa7984d602';
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`
        )
          .then((res) => res.json())
          .then((res) => console.log(`${res.name}, ${res.sys.country}`));
      },
      function (err) {
        console.log(err);
      }
    )
  );
  setInterval(function () {
    domObj.clock.innerHTML = clockObj.getClock();
  }, 1000);
  const currentName = localStorage.getItem(Constant.NAME);
  greetingObj.getGreeting(currentName);
  if (currentName) {
    todoObj.renderTodo();
  } else {
    greetingObj.renderName();
  }
}

init();
