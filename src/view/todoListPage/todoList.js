import { createElement } from "../../helpers.js";
import renderTodoItem from "./todo.js";

function renderEmptyPlaceholder(doc) {
  const emptyList = createElement(doc, "div", "empty-list");
  emptyList.innerHTML = "Nothing to do";

  return emptyList;
}

export default function renderTodoList(doc, allTodo) {
  const todoListElement = doc.querySelector(".todo-list");
  todoListElement.querySelectorAll("*").forEach((n) => n.remove());

  if (allTodo.length === 0) {
    todoListElement.append(renderEmptyPlaceholder(doc));
  } else {
    allTodo.forEach((todo) => {
      const todoElement = renderTodoItem(doc, todo);
      todoListElement.prepend(todoElement);
    });
  }
}
