import m from 'mithril';
import CounterVM from '../../models/counter';

const counterVm = new CounterVM();

const Counter = {
  oninit() {
    this.vm = counterVm;
  },

  view(vnode) {
    return m('.counter', [
      m('h2', 'Counter'),
      m('span', vnode.state.vm.count()),
      m('button', { onclick: () => vnode.state.vm.increment() }, '+'),
      m('button', { onclick: () => vnode.state.vm.decrement() }, '-'),
      m('button', { onclick: () => vnode.state.vm.reset() }, 'reset'),
    ]);
  },
};

export default Counter;
