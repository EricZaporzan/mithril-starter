import m from 'mithril';
import TodoVM from '../../models/todo';

const todoVM = new TodoVM();

const completed = todo => (todo.completed() ? 'completed' : '');
const filterCompleted = todo => !(todoVM.hideCompleted() && todo.completed());

const Todo = {
  oninit() {
    this.vm = todoVM;
    this.newTodo = m.prop('');
  },

  view() {
    const remaining = this.vm.remaining();

    return m('.todo', [
      m('h2', 'Todo List'),
      m('input', {
        onchange: m.withAttr('value', this.newTodo),
        placeholder: 'new todo',
        value: this.newTodo() }),
      m('button', {
        onclick: () => {
          this.vm.add(this.newTodo());
          this.newTodo('');
        },
      }, 'Add'),
      m('button.toggle-completed', {
        class: this.vm.hideCompleted() ? 'hidden' : '',
        onclick: () => this.vm.hideCompleted(!this.vm.hideCompleted()),
      }, 'Hide Completed'),
      remaining ? m('h4', `Remaining todos ${remaining}`) : null,
      this.vm.todos.length === 0 ? m('p', 'No todos :(. Add some!') : m('.todo-list',
        this.vm.todos.filter(filterCompleted).map((todo, index) => m('.todo-item', [
          m('span', { class: completed(todo), onclick: () => todo.toggleComplete() }, todo.title()),
          m('button', { onclick: () => this.vm.remove(index) }, 'x'),
        ]))
      ),
    ]);
  },
};

export default Todo;
