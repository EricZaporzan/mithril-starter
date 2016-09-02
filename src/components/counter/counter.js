import m from 'mithril';
import CounterVM from '../../models/counter';

const Counter = {
  oninit() {
    this.vm = new CounterVM();
  },

  view() {
    return m('.counter', [
      m('h2', 'Counter'),
      m('span', this.vm.count()),
      m('button.increment', { onclick: () => this.vm.increment() }, '+'),
      m('button.decrement', { onclick: () => this.vm.decrement() }, '-'),
      m('button.reset', { onclick: () => this.vm.reset() }, 'reset'),
    ]);
  },
};

export default Counter;
