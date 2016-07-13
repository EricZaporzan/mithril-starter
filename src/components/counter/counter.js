import m from 'mithril';
import CounterVM from '../../models/counter';

const counterVm = new CounterVM();

const Counter = {
  controller() {
    this.vm = counterVm;
  },

  view(ctrl) {
    return m('.counter', [
      m('h2', 'Counter'),
      m('span', ctrl.vm.count()),
      m('button', { onclick: () => ctrl.vm.increment() }, '+'),
      m('button', { onclick: () => ctrl.vm.decrement() }, '-'),
      m('button', { onclick: () => ctrl.vm.reset() }, 'reset'),
    ]);
  },
};

export default Counter;
