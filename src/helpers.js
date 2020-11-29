export function getTodoInput(doc) {
  return doc.getElementById("todo-text");
}

export function createElement(doc, tagName, className) {
  const element = doc.createElement(tagName);
  if (className !== undefined) {
    element.className = className;
  }

  return element;
}
