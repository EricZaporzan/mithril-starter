import m from 'mithril';
import TodoVM from '../../models/todo';

const todoVM = new TodoVM();

const completed = todo => (todo.completed() ? 'completed' : '');
const filterCompleted = todo => !(todoVM.hideCompleted() && todo.completed());

const Todo = {
  oninit() {
    this.vm = todoVM;
    this.newTodo = m.prop('');

    this.showTodoList = () => {
      if (this.vm.todos.length === 0) {
        return m('p', 'No todos :(. Add some!');
      }

      return m('.Todo-list',
        this.vm.todos.filter(filterCompleted).map((todo, index) => m('.Todo-item', [
          m('span', { class: completed(todo), onclick: () => todo.toggleComplete() }, todo.title()),
          m('button', { onclick: () => this.vm.remove(index) }, 'x'),
        ]))
      );
    };
  },

  view() {
    const remaining = this.vm.remaining();

    return m('.Todo', [
      m('h2', 'Todo List'),
      m('input', {
        onchange: m.withAttr('value', this.newTodo),
        placeholder: 'new todo',
        value: this.newTodo() }),
      m('button.add', {
        onclick: () => {
          this.vm.add(this.newTodo());
          this.newTodo('');
        },
      }, 'Add'),
      m('button.clear', { onclick: () => this.vm.clearAll() }, 'Clear All'),
      m('button.toggle-completed', {
        class: this.vm.hideCompleted() ? 'hidden' : '',
        onclick: () => this.vm.hideCompleted(!this.vm.hideCompleted()),
      }, 'Hide Completed'),
      remaining ? m('h4.remaining', `Remaining todos ${remaining}`) : null,
      this.showTodoList(),
    ]);
  },
};


export default Todo;
