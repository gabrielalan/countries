import * as serviceWorker from './serviceWorker';
import createSagaMiddleware from 'redux-saga'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import { ApolloProvider } from "react-apollo";
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import client from './api/client';
import reducers from './reducers';
import rootSaga from './sagas';
import pages from './components/pages';
import Routes from './components/routing/routes';
import IconSprite from './components/presentational/icon/IconSprite';

import './index.scss';

const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <IconSprite />
      <Routes
        Router={HashRouter}
        Redirect={Redirect}
        Route={Route}
        Switch={Switch}
        pages={pages}
        />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
