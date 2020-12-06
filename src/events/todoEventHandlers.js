import todoStorage from "../model/todoStorage.js";
import renderTodoPage from "../view/todoPage/todoPage.js";
import renderTodoListPage from "../view/todoListPage/todoListPage.js";

function renderTodoScreen(doc, event) {
  const todoId = event.detail.todoId;
  console.log(`Rendering todo screen for todo: ${todoId}`);
  renderTodoPage(doc, todoStorage.getTodoById(todoId));
}

function renderListPage(doc) {
  console.log(`Rendering list screen.`);
  renderTodoListPage(doc, todoStorage.getAllTodo());
}

function notifyAboutTodoChange(doc, todoId) {
  const todoItemChanged = new CustomEvent("full-todo-item-changed", {
    detail: { todoId },
  });
  doc.dispatchEvent(todoItemChanged);
}

function notifyAboutBackToListView(doc) {
  const backToList = new Event("back-to-list-fired");
  doc.dispatchEvent(backToList);
}

function todoListActionHandler(doc, event) {
  const actionName = event.target.dataset["action"];
  const todoId = event.target.dataset["id"];

  switch (actionName) {
    case "back-to-list":
      console.log(`Processing back-to-list action for id: ${todoId}`);
      notifyAboutBackToListView(doc);
      break;
    case "postpone":
      console.log(`Processing postpone action for id: ${todoId}`);
      todoStorage.postponeById(todoId);
      notifyAboutTodoChange(doc, todoId);
      break;
    case "resume":
      console.log(`Processing resume action for id: ${todoId}`);
      todoStorage.resumeById(todoId);
      notifyAboutTodoChange(doc, todoId);
      break;
    case "done":
      console.log(`Processing done action for id: ${todoId}`);
      todoStorage.completeById(todoId);
      notifyAboutTodoChange(doc, todoId);
      break;
    case "delete":
      console.log(`Processing delete action for id: ${todoId}`);
      todoStorage.deleteById(todoId);
      notifyAboutBackToListView(doc);
      break;

    default:
      console.log("Panic! Unknown Action.");
  }
}

let boundTodoListActionHandler = null;
let boundRenderTodoScreen = null;
let boundRenderListPage = null;

export function getTodoEventHandlers(doc) {
  boundTodoListActionHandler =
    boundTodoListActionHandler !== null
      ? boundTodoListActionHandler
      : todoListActionHandler.bind(null, doc);

  boundRenderTodoScreen =
    boundRenderTodoScreen !== null
      ? boundRenderTodoScreen
      : renderTodoScreen.bind(null, doc);

  boundRenderListPage =
    boundRenderListPage !== null
      ? boundRenderListPage
      : renderListPage.bind(null, doc);

  return [
    {
      elementId: "todo-list",
      eventName: "click",
      handler: boundTodoListActionHandler,
    },
    {
      element: doc,
      eventName: "full-todo-item-changed",
      handler: boundRenderTodoScreen,
    },
    {
      element: doc,
      eventName: "back-to-list-fired",
      handler: boundRenderListPage,
    },
  ];
}
