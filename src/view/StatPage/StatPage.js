import { createElement } from "../../helpers.js";
import { clearRootElement } from "../../helpers.js";
import todoStorage from "../../model/todoStorage.js";
import configureRouter from "../../routerConfig.js";

export default function renderStatPage(doc) {
  const rootElement = clearRootElement(doc);

  const appContainer = createElement(doc, "div");
  appContainer.id = "app-container";

  const container = createElement(doc, "div");
  container.id = "todo-list";

  const todoItem = createElement(doc, "div", "item");

  const info = createElement(doc, "h2", "title-statistics");
  info.innerHTML = "Todo Statistics";

  const allStats = createElement(doc, "div", "all-stats");
  const allStatsBlock = createElement(doc, "div", "all-stats-block");

  const totalCount = createElement(doc, "span", "total-info info");
  totalCount.innerHTML = `Total ToDOs Count: ${todoStorage.todoCount}`;

  const postponed = createElement(doc, "span", "postponed-info info");
  postponed.innerHTML = `ToDOs Postponed: ${todoStorage.todoPosponed}`;

  const done = createElement(doc, "span", "done-info info");
  done.innerHTML = `ToDOs Done: ${todoStorage.todoDone}`;

  const deleted = createElement(doc, "span", "deleted-info info");
  deleted.innerHTML = `ToDOs Deleted: ${todoStorage.todoDeleted}`;

  const backToListButton = createElement(doc, "button", "back-to-list-button");
  backToListButton.innerHTML = "Back To List";
  backToListButton.addEventListener("click", (e) => {
    e.preventDefault();

    const router = configureRouter(doc, "/");
    router.navigate("/");
  });

  allStats.append(totalCount, postponed, done, deleted);
  allStatsBlock.append(allStats, backToListButton);
  todoItem.append(info, allStatsBlock);
  container.append(todoItem);
  appContainer.append(container);

  rootElement.append(appContainer);
}
