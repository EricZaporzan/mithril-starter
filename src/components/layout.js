import m from 'mithril';

const isActive = (current) => (route) => {
  return current === route ? '.active' : '';
};

const Layout = {
  controller() {
    this.active = isActive(m.route());
  },

  view(ctrl, props, children) {
    const { active } = ctrl;
    return m('.container', [
      m('header', [
        m(`a${active('/')}`, { href: '/', config: m.route }, 'Counter'),
        m(`a${active('/todo')}`, { href: '/todo', config: m.route }, 'Todo'),
      ]),
      m(children),
    ]);
  },
};

export default Layout;
