import m from 'mithril';

const isActive = current => route => (current === route ? '.active' : '');

const Layout = {
  oninit() {
    this.active = isActive(m.route.get());
  },

  view(vnode) {
    return m('.container', [
      m('header', [
        m(`a${vnode.state.active('/')}`, { href: '/', oncreate: m.route.link }, 'Counter'),
        m(`a${vnode.state.active('/todo')}`, { href: '/todo', oncreate: m.route.link }, 'Todo'),
      ]),
      vnode.children,
    ]);
  },
};

export default Layout;
