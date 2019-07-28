import React from 'react';
import renderer from 'react-test-renderer';
import { Routes } from './routes';

const PassThrough = ({ children }) => children;
const Route = ({ render }) => render({});
const Redirect = ({ children, to }) => <div className="redirect">{JSON.stringify(to)} - {children}</div>;
const Page = () => <span>Page</span>;

describe('routes', () => {
  it('should render pages correctly secured', () => {
    const pages = [
      { path: '/', component: Page },
      { path: '/page', isPrivate: true, component: Page },
    ];

    const comp = <Routes
      Route={Route}
      Router={PassThrough}
      Switch={PassThrough}
      Redirect={Redirect}
      pages={pages} />;

    const tree = renderer.create(comp).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render loading if its loading', () => {
    const pages = [
      { path: '/', component: Page },
      { path: '/page', isPrivate: true, component: Page },
    ];

    const comp = <Routes
      isAppLoading={true}
      Route={Route}
      Router={PassThrough}
      Switch={PassThrough}
      Redirect={Redirect}
      pages={pages} />;

    const tree = renderer.create(comp).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
