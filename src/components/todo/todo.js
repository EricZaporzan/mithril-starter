import m from 'mithril';
import TodoVM from '../../models/todo';

const todoVM = new TodoVM();

const completed = todo => (todo.completed() ? '.completed' : '');

const Todo = {
  oninit() {
    this.vm = todoVM;
    this.newTodo = m.prop('');
  },

  view(vnode) {
    const remaining = vnode.state.vm.remaining();
    const hideCompleted = vnode.state.vm.hideCompleted();

    return m('.todo', [
      m('h2', 'Todo List'),
      m('input', {
        onchange: m.withAttr('value', vnode.state.newTodo),
        placeholder: 'new todo',
        value: vnode.state.newTodo() }),
      m('button', {
        onclick: () => {
          vnode.state.vm.add(vnode.state.newTodo());
          vnode.state.newTodo('');
        },
      }, 'Add'),
      m(`button.toggle-completed${hideCompleted ? '.hidden' : ''}`, {
        onclick: () => vnode.state.vm.hideCompleted(!vnode.state.vm.hideCompleted()),
      }, 'Hide Completed'),
      vnode.state.vm.todos.length === 0 ? m('p', 'No todos :(. Add some!') : m('.todo-list', [
        remaining ? m('h4', `Remaining todos ${remaining}`) : null,
        vnode.state.vm.todos.map((todo, index) => hideCompleted && todo.completed() ? null : m('.todo-item', [
          m(`span${completed(todo)}`, { onclick: () => todo.toggleComplete() }, todo.title()),
          m('button', { onclick: () => vnode.state.vm.remove(index) }, 'x'),
        ])),
      ]),
    ]);
  },
};

export default Todo;
