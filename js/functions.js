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

  if (todo) {
    todo.completed = !todo.completed;
  }
}

const generateTodoDOM = (todo) => {
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
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

  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);

  button.textContent = 'remove';
  button.classList.add('button', 'button--text')
  button.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  containerEl.appendChild(checkbox);
  containerEl.appendChild(todoText);
  todoEl.appendChild(button);

  return todoEl;
}

const generateSummaryDOM = (incompleteTodos) => {
  const pluralWord = incompleteTodos.length === 1 ? '' : 's';
  const summary = document.createElement('h2');
  summary.classList.add('list-title');
  summary.textContent = `You have ${incompleteTodos.length} todo${pluralWord} left`;
  return summary;
}

const renderTodos = (todos, filters) => {
  const todosEl = document.querySelector('#todos');

  let filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = filters.hideCompleted ? !todo.completed : true
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  todosEl.innerHTML = '';

  todosEl.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todosEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.textContent = 'No to-dos to show';
    emptyMessage.classList.add('empty-message');
    todosEl.appendChild(emptyMessage);
  }
}