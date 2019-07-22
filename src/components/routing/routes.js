import React from 'react';

function withSecurity(Route, Redirect) {
  const isLoggedIn = false;

  const createRenderer = (Component, isPrivate) => props =>
    !isPrivate || isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: "/login",
        state: { from: props.location }
      }}/>
    );

  return ({ component, isPrivate, ...attributes }) =>
    <Route
      {...attributes}
      render={createRenderer(component, isPrivate)}
    />;
}

export default function Routes({Router, Route, Redirect, Switch, pages}) {
  const SecuredRoute = withSecurity(Route, Redirect);

  return <Router>
    <Switch>{
      pages.map(props => <SecuredRoute key={props.path} {...props} />)
    }</Switch>
  </Router>;
}
