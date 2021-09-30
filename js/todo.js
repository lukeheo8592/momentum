const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");


const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDO) => toDO.id !== Number(li.id));
  saveToDos();
}

function updateToDoList(id, todo){
  const idx = toDos.findIndex((todo) => todo.id ===parseInt(id));
  toDos[idx] = todo;
  saveToDos();
}
function doneToDo(event){
const toDoText = event.target.previousSibling;
const id = event.target.parentElement.id;
const toDo = event.target.previousElement;
const targetToDO = toDos.find((e) => e.id === parseInt(id));
console.log(targetToDO);
if(toDoText.classList.contains("done")){
  toDoText.classList.remove("done");
  targetToDO.done = false;
}else{
  toDoText.classList.add("done");
  targetToDO.done = true;
}
updateToDoList(id, targetToDO);
}
function paintToDo(newToDo) {
  const li = document.createElement("li");
  li.id = newToDo.id;
  const span = document.createElement("span");
  span.innerText = newToDo.text;
  if(newToDo.done === true){
    span.classList.add("done");
  }else{
    span.classList.remove("done");
  }
  const button1 = document.createElement("button");button1.innerText = "✅";
  button1.addEventListener("click", doneToDo);

  const button2 = document.createElement("button");
  button2.innerText = "❌";
  button2.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button1);
  li.appendChild(button2);
  toDoList.appendChild(li);
  
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";

  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    done: false,
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
