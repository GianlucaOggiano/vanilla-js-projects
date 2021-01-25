const formElement = document.getElementById('form');
const inputElement = form.querySelector('input');
const todosElement = document.getElementById('todos');
const todoItems = document.querySelectorAll('.todo');

const todos =
  localStorage.getItem('todos') !== null
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

console.log({ todos });

const createTodoElement = (todo) => {
  const todoElement = document.createElement('li');
  if (todo.completed) {
    todoElement.classList.add('completed');
  }
  todoElement.setAttribute('data-key', todo.id);
  todoElement.classList.add('todo');
  if (todo.completed) {
    todoElement.innerHTML = `
      <img src="./img/check-circle.svg" alt="checkbox" class='checkbox'/>
      ${todo.todo}
      <img src="./img/close.svg" alt="close" class='close'/>
    `;
  } else {
    todoElement.innerHTML = `
      <img src="./img/circle.svg" alt="checkbox" class='checkbox'/>
      ${todo.todo}
      <img src="./img/close.svg" alt="close" class='close'/>
    `;
  }
  todosElement.appendChild(todoElement);
};

todos.forEach((todo) => {
  createTodoElement(todo);
});

const submitHandler = formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(inputElement.value);
  const inputValue = inputElement.value;
  const todo = { id: Math.random(), todo: inputValue, completed: false };
  todos.push(todo);
  createTodoElement(todo);
  localStorage.setItem('todos', JSON.stringify(todos));

  inputElement.value = '';
});

const deleteTodoHandler = todosElement.addEventListener('click', (e) => {
  if (e.target.classList.contains('close')) {
    const todoId = e.target.parentElement.dataset.key;
    const todos = JSON.parse(localStorage.getItem('todos'));
    const todoIndex = todos.findIndex((todo) => todo.id === +todoId);
    todos.splice(todoIndex, 1);
    console.log({ todos });
    localStorage.setItem('todos', JSON.stringify(todos));
    e.target.parentElement.remove();
  }
});

const toggleCompleteHandler = todosElement.addEventListener('click', (e) => {
  if (e.target.classList.contains('checkbox')) {
    e.target.parentElement.classList.toggle('completed');

    const todoId = e.target.parentElement.dataset.key;
    const todos = JSON.parse(localStorage.getItem('todos'));
    const todo = todos.find((todo) => todo.id === +todoId);
    todo.completed = !todo.completed;
    if (todo.completed) {
      e.target.parentElement.querySelector('.checkbox').src =
        './img/check-circle.svg';
    } else {
      e.target.parentElement.querySelector('.checkbox').src =
        './img/circle.svg';
    }
    console.log({ todos });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
});
