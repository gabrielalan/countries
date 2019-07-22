import React from 'react';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from "react-apollo";

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import client from './api/client';
import pages from './components/pages';
import Routes from './components/routing/routes';

import './index.scss';

render(
  <ApolloProvider client={client}>
    <Routes
      Router={BrowserRouter}
      Redirect={Redirect}
      Route={Route}
      Switch={Switch}
      pages={pages}
      />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
