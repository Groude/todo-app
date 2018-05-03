'use strict';

let todos = getSavedTodos();

const filters = {
  searchText: '',
  hideCompleted: false
};

renderTodos(todos, filters);

document.querySelector('#add-todo').addEventListener('submit', (e) => {
  e.preventDefault();
  todos.push ({
    id: uuidv4(),
    text: e.target.elements.todoName.value,
    completed: false
  });
  saveTodos(todos);
  renderTodos(todos, filters);
  e.target.elements.todoName.value = '';
});

document.querySelector('#search-todo').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector('#hide-completed').addEventListener('change', (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});