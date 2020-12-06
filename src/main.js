import todoStorage from "./model/todoStorage.js";
import renderTodoListPage from "./view/todoListPage/todoListPage.js";

export function startApplication(doc) {
  console.log("TODO Application started");

  renderTodoListPage(doc, todoStorage.getAllTodo());
}
