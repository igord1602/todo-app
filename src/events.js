import { getTodoInput } from "./helpers.js";

import todoStorage from "./model/todoStorage.js";
import renderTodoList from "./view/todoList.js";

function addTodoHandler(doc) {
  console.log("Add button clicked");
  const todoTextInput = getTodoInput(doc);
  todoStorage.createTodo(todoTextInput.value);

  const todoItemCreated = new Event("todo-item-created");
  doc.dispatchEvent(todoItemCreated);
}

function clearFormHandler(doc) {
  console.log("Clear button clicked");
  const todoTextInput = getTodoInput(doc);
  todoTextInput.value = "";
}

function updateTotalTodoCount(doc) {
  console.log("Updating Total Todo Count");

  const h2 = doc.getElementById("todo-counter");
  h2.innerHTML = `Total Todo Count: ${todoStorage.totalTodoCount()}`;
}

function updateTodoList(doc) {
  console.log("Updating Todo List");

  const allTodo = todoStorage.getAllTodo();
  renderTodoList(doc, allTodo);
}

function notifyAboutTodoChange(doc) {
  const todoItemChanged = new Event("todo-item-changed");
  doc.dispatchEvent(todoItemChanged);
}

function notifyAboutDeletedTodo(doc) {
  const todoItemDeleted = new Event("todo-item-deleted");
  doc.dispatchEvent(todoItemDeleted);
}

function todoListActionHandler(doc, event) {
  const actionName = event.target.dataset["action"];
  const todoId = event.target.dataset["id"];

  switch (actionName) {
    case "view":
      console.log(`Processing view action for id: ${todoId}`);
      // window.location.href = `index.html/todo/${todoId}`;
      // history.pushState({}, `Todo Id: ${todoId}`, `todo/${todoId}`);
      break;
    case "postpone":
      console.log(`Processing postpone action for id: ${todoId}`);
      todoStorage.postponeById(todoId);
      notifyAboutTodoChange(doc);
      break;
    case "resume":
      console.log(`Processing resume action for id: ${todoId}`);
      todoStorage.resumeById(todoId);
      notifyAboutTodoChange(doc);
      break;
    case "done":
      console.log(`Processing done action for id: ${todoId}`);
      todoStorage.completeById(todoId);
      notifyAboutTodoChange(doc);
      break;
    case "delete":
      console.log(`Processing delete action for id: ${todoId}`);
      todoStorage.deleteById(todoId);
      notifyAboutDeletedTodo(doc);
      break;

    default:
      console.log("Panic! Unknown Action.");
  }
}

function setupEventListenerByName(doc, elementId, eventName, handler) {
  const element = doc.getElementById(elementId);
  element.addEventListener(eventName, handler);
}

function setupEventListener(element, eventName, handler) {
  element.addEventListener(eventName, handler);
}

function describeEventListeners(doc) {
  return [
    {
      elementId: "add-todo-button",
      eventName: "click",
      handler: addTodoHandler.bind(null, doc),
    },
    {
      elementId: "clear-form-button",
      eventName: "click",
      handler: clearFormHandler.bind(null, doc),
    },
    {
      elementId: "todo-list",
      eventName: "click",
      handler: todoListActionHandler.bind(null, doc),
    },
    {
      element: doc,
      eventName: "todo-item-created",
      handler: updateTotalTodoCount.bind(null, doc),
    },
    {
      element: doc,
      eventName: "todo-item-created",
      handler: updateTodoList.bind(null, doc),
    },
    {
      element: doc,
      eventName: "todo-item-created",
      handler: clearFormHandler.bind(null, doc),
    },
    {
      element: doc,
      eventName: "todo-item-changed",
      handler: updateTodoList.bind(null, doc),
    },
    {
      element: doc,
      eventName: "todo-item-deleted",
      handler: updateTotalTodoCount.bind(null, doc),
    },
    {
      element: doc,
      eventName: "todo-item-deleted",
      handler: updateTodoList.bind(null, doc),
    },
  ];
}

export function setupEventListeners(doc) {
  console.log("Setting up event listeners");

  describeEventListeners(doc).forEach((h) => {
    if (h.element === undefined) {
      setupEventListenerByName(doc, h.elementId, h.eventName, h.handler);
    } else {
      setupEventListener(h.element, h.eventName, h.handler);
    }
  });
}
