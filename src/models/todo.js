import m from 'mithril';

class Todo {
  constructor(title) {
    this.completed = m.prop(false);
    this.title = m.prop(title);
  }

  toggleComplete() {
    this.completed(!this.completed());
  }
}

export default class TodoList {
  constructor() {
    this.todos = [];
    this.hideCompleted = m.prop(false);
  }

  add(todo) {
    this.todos.push(new Todo(todo));
  }

  remove(todoIndex) {
    this.todos.splice(todoIndex, 1);
  }

  remaining() {
    let r = 0;
    this.todos.map(todo => todo.completed() || r++);
    return r;
  }

  clearAll() {
    this.todos = [];
  }
}
