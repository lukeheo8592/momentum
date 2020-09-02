const Constant = {
  NAME: 'name',
  HOUR: 'hour',
  TODOS: 'todos',
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
  name: '',
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
    input.addEventListener('input', function (e) {
      console.log(e.target.value);
      greetingObj.name = e.target.value;
    });
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
    todoObj.todos.forEach((todo) => {
      todoObj.renderTodoItem(todo);
    });
  },
  addTodo: function (todo) {
    todoObj.todos.push(todo);
    localStorage.setItem(Constant.TODOS, JSON.stringify(todoObj.todos));
  },
  renderTodoItem: function (todo) {
    const todoText = `<div class="todo-item">
    <div class="left"><span class="desc">${todo}</span></div>
    <div class="right">
      <span class="done">✅</span>
      <span class="update">✏️</span>
      <span class="delete">🗑️</span>
    </div>
  </div>`;
    domObj.todoList.innerHTML += todoText;
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
  todoList: document.querySelector('.todo-list'),

  submitHandler: function (e) {
    e.preventDefault();
    if (e.target.classList.contains('name-form')) {
      localStorage.setItem(Constant.NAME, greetingObj.name);
      location.href = '/';
    } else {
      const todo = e.target.firstElementChild.value;
      todoObj.addTodo(todo);
      todoObj.renderTodoItem(todo);
      e.target.firstElementChild.value = '';
    }
    // console.log(todos);
    // domObj.todoInput.value = '';
    return false;
  },
};

function init() {
  //db
  todoObj.todos = JSON.parse(localStorage.getItem(Constant.TODOS)) || [];

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
