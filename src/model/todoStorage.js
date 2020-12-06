import Todo from "./todo.js";

class TodoStorage {
  constructor() {
    this.storage = {};

    this.currentId = 0;
    this.todoCount = 0;
  }

  createTodo(text) {
    const newTodo = new Todo(text);
    this.storage[this.currentId] = newTodo;
    this.currentId += 1;
    this.todoCount += 1;
  }

  totalTodoCount() {
    return this.todoCount;
  }

  getTodoById(id) {
    const todo = this.storage[id];
    return {
      id,
      text: todo.text,
      state: todo.state,
      dateCreated: new Date(todo.dateCreated),
      dateCompleted:
        todo.dateCompleted !== null ? new Date(todo.dateCompleted) : null,
    };
  }

  postponeById(id) {
    const todo = this.storage[id];
    todo.postpone();
  }

  resumeById(id) {
    const todo = this.storage[id];
    todo.resume();
  }

  completeById(id) {
    const todo = this.storage[id];
    todo.done();
  }

  deleteById(id) {
    delete this.storage[id];
    this.todoCount -= 1;
  }

  getAllTodo() {
    return Object.keys(this.storage).map((key) => {
      const todo = this.storage[key];

      return {
        id: key,
        text: todo.text,
        state: todo.state,
        dateCreated: new Date(todo.dateCreated),
        dateCompleted:
          todo.dateCompleted !== null ? new Date(todo.dateCompleted) : null,
      };
    });
  }
}

const todoStorage = new TodoStorage();

export default todoStorage;
