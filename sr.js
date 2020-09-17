const Constant = {
  NAME: "name",
  HOUR: "hour",
  TODOS: "todos",
};

const util = {
  getZero: function (value) {
    return value < 10 ? `0${value}` : value;
  },
  disabled: function (element) {
    element.disabled = true;
  },
  enabled: function (element) {
    element.disabled = false;
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
  renderClock: function () {
    setInterval(function () {
      domObj.clock.innerHTML = clockObj.getClock();
    }, 1000);
  },
};

const greetingObj = {
  name: "",
  getGreeting: function (name) {
    const greetingType =
      localStorage.getItem(Constant.HOUR) > 17
        ? "Good evening"
        : localStorage.getItem(Constant.HOUR) > 11
        ? "Good afternoon"
        : "Good morning";
    domObj.greeting.innerHTML = `${greetingType}, ${name ? name : "lovely"}`;
  },
  renderName: function () {
    const h1 = document.createElement("h1");
    h1.innerText = "What is your name?";
    const form = document.createElement("form");
    form.classList.add("name-form");
    const input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.addEventListener("input", function (e) {
      console.log(e.target.value);
      greetingObj.name = e.target.value;
    });
    const submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Next";
    form.appendChild(input);
    form.appendChild(submit);
    domObj.container.appendChild(h1);
    domObj.container.appendChild(form);
    domObj.nameForm = document.querySelector(".todo-container .name-form");
    domObj.nameForm.onsubmit = domObj.submitHandler;
  },
  renderGreeting: function () {
    const currentName = localStorage.getItem(Constant.NAME);
    greetingObj.getGreeting(currentName);
    if (currentName) {
      todoObj.renderTodo();
    } else {
      greetingObj.renderName();
    }
  },
};

const todoObj = {
  todos: [],
  renderTodo: function () {
    domObj.container.innerHTML = `<h1>What is your main focus for today?</h1>
      <form class="todo-form">
          <input type="text" name="todo" />
      </form>`;
    domObj.todoForm = document.querySelector(".todo-container .todo-form");
    domObj.todoForm.onsubmit = domObj.submitHandler;
    todoObj.todos.forEach((todo) => {
      todoObj.renderTodoItem(todo);
    });
    domObj.todoList.onclick = todoObj.todoClickHandler;
  },
  updateTodoList: function (id, todo) {
    console.log(id, todo);
    const idx = todoObj.todos.findIndex((todo) => todo.id === id);
    todoObj.todos[idx] = todo;
    console.log(todoObj.todos);
    localStorage.setItem(Constant.TODOS, JSON.stringify(todoObj.todos));
  },
  renderInput: function (todo) {
    const input = document.createElement("input");
    input.value = todo;
    input.classList.add("desc");
    return input;
  },
  renderSpan: function (todo) {
    const span = document.createElement("span");
    span.innerHTML = todo;
    span.classList.add("desc");
    return span;
  },
  todoClickHandler: function (e) {
    const id = e.target.parentElement.parentElement.dataset.id;
    const targetTodo = todoObj.todos.find((e) => e.id === id);
    if (e.target.classList.contains("done")) {
      console.log(todoObj.todos, targetTodo);
      // console.log(targetTodo);
      const targetElement =
        e.target.parentElement.previousElementSibling.firstElementChild;
      if (targetElement.classList.contains("todo-done")) {
        targetElement.classList.remove("todo-done");
        util.enabled(e.target.nextElementSibling);
        util.disabled(e.target.nextElementSibling.nextElementSibling);
        targetTodo.done = false;
        todoObj.updateTodoList(id, targetTodo);
      } else {
        targetElement.classList.add("todo-done");
        util.disabled(e.target.nextElementSibling);
        util.enabled(e.target.nextElementSibling.nextElementSibling);
        targetTodo.done = true;
        todoObj.updateTodoList(id, targetTodo);
      }
    } else if (e.target.classList.contains("update")) {
      const targetElement =
        e.target.parentElement.previousElementSibling.firstElementChild;
      console.log(targetElement);
      if (targetElement.nodeName === "SPAN") {
        targetElement.parentElement.replaceChild(
          todoObj.renderInput(targetElement.innerText),
          targetElement
        );
      } else {
        targetElement.parentElement.replaceChild(
          todoObj.renderSpan(targetElement.value),
          targetElement
        );
        targetTodo.todo = targetElement.value;
        todoObj.updateTodoList(id, targetTodo);
      }
    } else if (e.target.classList.contains("delete")) {
      e.target.parentElement.parentElement.remove();
      todoObj.todos = todoObj.todos.filter((todo) => todo.id !== id);
      localStorage.setItem(Constant.TODOS, JSON.stringify(todoObj.todos));
    }
  },
  addTodo: function (todo) {
    todoObj.todos.push(todo);
    localStorage.setItem(Constant.TODOS, JSON.stringify(todoObj.todos));
  },
  renderTodoItem: function (todo) {
    const todoText = `<div class="todo-item" data-id=${todo.id}>
      <div class="left"><span class="desc ${todo.done ? "todo-done" : ""}">${
      todo.todo
    }</span></div>
      <div class="right">
        <button class="done">✅</button>
        <button class="update">✏️</button>
        <button class="delete" ${!todo.done && "disabled"}>🗑️</button>
      </div>
    </div>`;
    domObj.todoList.innerHTML += todoText;
  },
};

const domObj = {
  clock: document.querySelector(".clock"),
  greeting: document.querySelector(".greeting"),
  container: document.querySelector(".todo-container"),
  todoForm: "",
  todoInput: document.querySelector(".todo-form input"),
  nameForm: "",
  nameInput: document.querySelector(".name-form input"),
  todoList: document.querySelector(".todo-list"),

  submitHandler: function (e) {
    e.preventDefault();
    if (e.target.classList.contains("name-form")) {
      localStorage.setItem(Constant.NAME, greetingObj.name);
      location.href = "/";
    } else {
      const todo = {};
      todo.id = Math.floor(Math.random() * Date.now()).toString(36);
      todo.todo = e.target.firstElementChild.value;
      todo.done = false;
      todoObj.addTodo(todo);
      todoObj.renderTodoItem(todo);
      e.target.firstElementChild.value = "";
    }
    // console.log(todos);
    // domObj.todoInput.value = '';
    return false;
  },
};

function init() {
  //db
  todoObj.todos = JSON.parse(localStorage.getItem(Constant.TODOS)) || [];
  // clock rendering
  clockObj.renderClock();
  // greeing rendering
  greetingObj.renderGreeting();
}

init();
