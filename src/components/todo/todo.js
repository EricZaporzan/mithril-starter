import m from 'mithril';
import TodoVM from '../../models/todo';

const todoVM = new TodoVM();

const completed = (todo) => {
  return todo.completed() ? '.completed' : '';
};

const Todo = {
  controller() {
    this.vm = todoVM;
    this.newTodo = m.prop('');
  },

  view(ctrl) {
    const remaining = ctrl.vm.remaining();
    const hideCompleted = ctrl.vm.hideCompleted();

    return m('.todo', [
      m('h2', 'Todo List'),
      m('input', {
        onchange: m.withAttr('value', ctrl.newTodo),
        placeholder: 'new todo',
        value: ctrl.newTodo() }),
      m('button', {
        onclick: () => {
          ctrl.vm.add(ctrl.newTodo());
          ctrl.newTodo('');
        },
      }, 'Add'),
      m(`button.toggle-completed${hideCompleted ? '.hidden' : ''}`, {
        onclick: () => ctrl.vm.hideCompleted(!ctrl.vm.hideCompleted()),
      }, 'Hide Completed'),
      ctrl.vm.todos.length === 0 ? m('p', 'No todos :(. Add some!') : m('.todo-list', [
        remaining ? m('h4', `Remaining todos ${remaining}`) : null,
        ctrl.vm.todos.map((todo, index) => hideCompleted && todo.completed() ? null : m('.todo-item', [
          m(`span${completed(todo)}`, { onclick: () => todo.toggleComplete() }, todo.title()),
          m('button', { onclick: () => ctrl.vm.remove(index) }, 'x'),
        ])),
      ]),
    ]);
  },
};

export default Todo;
