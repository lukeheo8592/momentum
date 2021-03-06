const Constant = {
  NAME: "name",
  HOUR: "hour",
  TODOS: "todos",
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
    const target = e.target.parentElement.previousElementSibling;
    const todoid = e.target.parentElement.parentElement.dataset.id;
    const targetID = todoObj.todos.find((e) => e.id === todoid);
    if (e.target.classList.contains("done")) {
      // e.target.style.backgroundcolor = "red";
      if (targetID.done) {
        target.style.backgroundColor = "transparent";
        targetID.done = false;
        e.target.nextElementSibling.nextElementSibling.style.opacity = "0.1";
      } else {
        target.style.backgroundColor = "red";
        targetID.done = true;
        e.target.nextElementSibling.nextElementSibling.style.opacity = "1";
      }
      localStorage.setItem(Constant.TODOS, JSON.stringify(todoObj.todos));
    } else if (e.target.classList.contains("update")) {
      const targetElement =
        e.target.parentElement.previousElementSibling.firstElementChild;
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
      }
      const targetValue = targetElement.value;
      function changeTodo(todoid, target) {
        console.log(todoObj.todos);
        targetID.todo = target;
        localStorage.setItem(Constant.TODOS, JSON.stringify(todoObj.todos));
      }

      changeTodo(todoid, targetValue);
    } else if (e.target.classList.contains("delete")) {
      if (targetID.done) {
        e.target.parentElement.parentElement.remove();
        todoObj.todos = todoObj.todos.filter((todo) => todo.id != todoid);
      }
      localStorage.setItem(Constant.TODOS, JSON.stringify(todoObj.todos));
    }
  },
  addTodo: function (todo) {
    todoObj.todos.push(todo);
    localStorage.setItem(Constant.TODOS, JSON.stringify(todoObj.todos));
  },
  renderTodoItem: function (todo) {
    console.log("asdasdasd", todo);
    const todoText = `<div class="todo-item" data-id = ${todo.id} >
    <div class="left" style = "background-color:${
      todo.done ? "red" : "transparent"
    }"><span class="desc" >${todo.todo}</span></div>
    <div class="right">
      <button class="done">???</button>
      <button class="update">??????</button>
      <button class="delete ${todo.done ? "done" : "undone"}" >???????</button>
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
  delete: "",

  submitHandler: function (e) {
    e.preventDefault();
    if (e.target.classList.contains("name-form")) {
      localStorage.setItem(Constant.NAME, greetingObj.name);
      location.href = "/";
    } else {
      const todo = {};
      todo.id = Math.floor(Date.now() * Math.random()).toString(36);
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
