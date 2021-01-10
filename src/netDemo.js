async function netFetchDemo() {
  const todoToSave = {
    userId: 1,
    title: "IT ACADEMY",
    completed: false,
  };

  const addResponse = await fetch(
    "https://jsonplaceholder.typicode.com/todos/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoToSave),
    }
  );

  if (!addResponse.ok) {
    console.log(`Error with status ${addResponse.status}`);
    return;
  }

  console.log(`Ok with status ${addResponse.status}`);

  const data = await addResponse.json();
  console.log(data);

  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");

  if (!response.ok) {
    console.log(`Error with status ${response.status}`);
    return;
  }

  console.log(`Ok with status ${response.status}`);

  const json = await response.json();
  console.log(json);
}

import Todo from "./model/todo.js";

const apiRoot = "http://localhost:3000";

async function createTodo(todoText) {
  const todo = new Todo(todoText);

  const addResponse = await fetch(`${apiRoot}/todos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!addResponse.ok) {
    console.log(`Error with status ${addResponse.status}`);
    return;
  }

  console.log(`Ok with status ${addResponse.status}`);

  const addedTodo = await addResponse.json();

  return addedTodo.id;
}

async function getAllTodo() {
  const allTodoResponse = await fetch(`${apiRoot}/todos/`);

  if (!allTodoResponse.ok) {
    console.log(`Error with status ${allTodoResponse.status}`);
    return;
  }

  console.log(`Ok with status ${allTodoResponse.status}`);

  return await allTodoResponse.json();
}

function convertToTodo(todoDto) {
  const todo = new Todo(todoDto.text);
  todo.state = todoDto.state;
  todo.dateCreated = new Date(todoDto.dateCreated);
  todo.dateCompleted =
    todoDto.dateCompleted === null ? null : new Date(todoDto.dateCompleted);

  return todo;
}

async function updateTodo(todoId, todo) {
  const updateResponse = await fetch(`${apiRoot}/todos/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!updateResponse.ok) {
    console.log(`Error with status ${updateResponse.status}`);
    return;
  }

  console.log(`Ok with status ${updateResponse.status}`);

  const updatedTodo = await updateResponse.json();

  return updatedTodo.id;
}

async function patchTodo(todoId, patch) {
  const patchResponse = await fetch(`${apiRoot}/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patch),
  });

  if (!patchResponse.ok) {
    console.log(`Error with status ${patchResponse.status}`);
    return;
  }

  console.log(`Ok with status ${patchResponse.status}`);

  const patchedTodo = await patchResponse.json();

  return patchedTodo.id;
}

async function postponeById(id, todo) {
  todo.postpone();
  const patch = { state: todo.state };
  return await patchTodo(id, patch);
}

async function resumeById(id, todo) {
  todo.resume();
  const patch = { state: todo.state };
  return await patchTodo(id, patch);
}

async function completeById(id, todo) {
  todo.done();
  const patch = {
    state: todo.state,
    dateCompleted: todo.dateCompleted,
  };
  return await patchTodo(id, patch);
}

export async function netDemo() {
  const todoNumber = Math.trunc(Math.random() * 1000);
  const newTodoId = await createTodo(
    `One more todo demo record ${todoNumber}.`
  );

  console.log(`=> ${newTodoId}`);

  const allTodo = await getAllTodo();

  const changedTodoPosition = Math.trunc(Math.random() * allTodo.length);
  const todoDto = allTodo[changedTodoPosition];
  const changedTodoId = todoDto.id;

  const todo = convertToTodo(todoDto);

  console.log(todo);
  completeById(changedTodoId, todo);
  console.log(todo);

  const id = await patchTodo(changedTodoId, todo);
  console.log(`=> ${id}`);
}
