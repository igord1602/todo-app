import Router from "./router.js";

import todoStorage from "./model/todoStorage.js";
import renderTodoListPage from "./view/todoListPage/todoListPage.js";

import renderTodoPage from "./view/todoPage/todoPage.js";

import renderStatPage from "./view/StatPage/StatPage.js";

let router = null;

export default (doc, appRootPath) => {
  if (router !== null) {
    return router;
  }

  router = new Router([], "history", appRootPath);

  router.add(/^\/$/, () => {
    console.log("=> Navigating to page");
    renderTodoListPage(doc, todoStorage.getAllTodo());
  });

  router.add(/^todo\/(.*)$/, (todoId) => {
    const parsedTodoId = parseInt(todoId);
    console.log(`=> Navigating to todo page with id: ${parsedTodoId}`);
    renderTodoPage(doc, todoStorage.getTodoById(parsedTodoId));
  });

  router.add(/^stat$/, () => {
    console.log("=> Navigating to report page");
    renderStatPage(doc);
  });

  router.listen();

  return router;
};
