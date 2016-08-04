import m from 'mithril';
import Layout from './components/layout';
import Counter from './components/counter/counter';
import Todo from './components/todo/todo';

m.route.mode = 'hash';

m.route(document.body, '/',
  {
    '/': { render: () => m(Layout, {}, m(Counter)) },
    '/todo': { render: () => m(Layout, {}, m(Todo)) },
  }
);
