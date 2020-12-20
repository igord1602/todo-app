import { createElement, clearRootElement } from "../../helpers.js";
import renderTodoItem from "./todo.js";

import { getListEventHandlers } from "../../events/listEventHandlers.js";
import { setupEventListeners } from "../../events.js";

function renderAppContainer(doc) {
  const element = createElement(doc, "div");
  element.id = "app-container";

  return element;
}

function renderTitle(doc, titleText) {
  const h1 = createElement(doc, "h1");
  h1.innerHTML = titleText;

  return h1;
}

function renderTodoForm(doc) {
  const editorFormContainer = createElement(doc, "div", "edit-form-container");
  editorFormContainer.append(renderTitle(doc, "Create Todo"));

  const editorForm = createElement(doc, "div", "editor-form");
  const form = createElement(doc, "form");

  const leftDiv = createElement(doc, "div", "form-row-left");

  const textInput = createElement(doc, "input");
  textInput.type = "text";
  textInput.name = "todo-text";
  textInput.id = "todo-text";

  leftDiv.append(textInput);

  const rightDiv = createElement(doc, "div", "form-row-right");

  const addButton = createElement(doc, "input");
  addButton.type = "button";
  addButton.id = "add-todo-button";
  addButton.value = "Add";

  const clearButton = createElement(doc, "input");
  clearButton.type = "button";
  clearButton.id = "clear-form-button";
  clearButton.value = "Clear";

  rightDiv.append(addButton);
  rightDiv.append(clearButton);

  form.append(leftDiv);
  form.append(rightDiv);
  editorForm.append(form);
  editorFormContainer.append(editorForm);

  return editorFormContainer;
}

function renderTodoTotal(doc, totalCount) {
  const h2 = createElement(doc, "h2");
  const textSpan = createElement(doc, "span");
  textSpan.id = "total-counter-text";
  textSpan.innerHTML = "Total Todo Count:";

  const totalSpan = createElement(doc, "span");
  totalSpan.id = "total-counter-number";
  totalSpan.innerHTML = `${totalCount}`;

  h2.append(textSpan);
  h2.append(totalSpan);

  return h2;
}

function renderStatPage(doc) {
  const statDiv = createElement(doc, "div", "list-filter-container");

  const statLink = createElement(doc, "a");

  statLink.id = "stat-link";
  statLink.href = "#";
  statLink.innerHTML = "Show statistics";

  statLink.addEventListener("click", (e) => e.preventDefault());

  statDiv.append(statLink);

  return statDiv;
}

function renderEmptyPlaceholder(doc) {
  const emptyList = createElement(doc, "div", "empty-list");
  emptyList.innerHTML = "Nothing to do";

  return emptyList;
}

function renderTodoList(doc, allTodo) {
  const todoList = createElement(doc, "div", "todo-list");
  todoList.id = "todo-list";

  if (allTodo.length === 0) {
    todoList.append(renderEmptyPlaceholder(doc));
  } else {
    allTodo.forEach((todo) => {
      const todoElement = renderTodoItem(doc, todo);
      todoList.append(todoElement);
    });
  }

  return todoList;
}

function renderTodoListContent(doc, allTodo) {
  const listContainer = createElement(doc, "div", "todo-list-container");
  listContainer.append(renderTitle(doc, "My ToDos"));

  listContainer.append(renderTodoTotal(doc, allTodo.length));
  listContainer.append(renderStatPage(doc));
  listContainer.append(renderTodoList(doc, allTodo));

  return listContainer;
}

export default function renderTodoListPage(doc, allTodo) {
  const rootElement = clearRootElement(doc);
  const appContainer = renderAppContainer(doc);

  appContainer.append(renderTodoForm(doc));
  appContainer.append(renderTodoListContent(doc, allTodo));

  rootElement.append(appContainer);

  setupEventListeners(doc, getListEventHandlers(doc));
}
