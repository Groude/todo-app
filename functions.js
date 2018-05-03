'use strict';

const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos');

  try {
    return todosJSON !== null ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }

}

const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
}

const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    todo.completed = !todo.completed;
  }
}

const generateTodoDOM = (todo) => {
  const todoEl = document.createElement('div');
  const checkbox = document.createElement('input');
  const todoText = document.createElement('span');
  const button = document.createElement('button');

  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  todoText.textContent = todo.text;

  button.textContent = 'x';
  button.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  todoEl.appendChild(checkbox);
  todoEl.appendChild(todoText);
  todoEl.appendChild(button);

  return todoEl;
}

const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h2');
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
}

const renderTodos = (todos, filters) => {
  let filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = filters.hideCompleted ? !todo.completed : true
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  document.querySelector('#todos').innerHTML = '';

  document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach((todo) => {
    document.querySelector('#todos').appendChild(generateTodoDOM(todo));
  });
}