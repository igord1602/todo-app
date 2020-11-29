import todoState from "./todoState.js";

export default class Todo {
  constructor(text) {
    this.text = text;
    this.state = todoState.InProcess;
    this.dateCreated = new Date();
    this.dateCompleted = null;
  }

  postpone() {
    this.state = todoState.Postponed;
  }

  resume() {
    this.state = todoState.InProcess;
  }

  done() {
    this.state = todoState.Done;
    this.dateCompleted = new Date();
  }
}
