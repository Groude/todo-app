'use strict';

let todos = getSavedTodos();

const filters = {
  searchText: '',
  hideCompleted: false
};

renderTodos(todos, filters);

document.querySelector('#add-todo').addEventListener('submit', (e) => {
  const inputEl = e.target.elements.text.value.trim();

  e.preventDefault();

  if (inputEl.length > 0) {
    todos.push ({
      id: uuidv4(),
      text: inputEl,
      completed: false
    });
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.text.value = '';
  }
});

document.querySelector('#search-todo').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector('#hide-completed').addEventListener('change', (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});