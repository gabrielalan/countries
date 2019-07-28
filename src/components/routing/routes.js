import React from 'react';
import { connect } from 'react-redux';

function withSecurity(authenticated, Route, Redirect) {
  const createRenderer = (Component, isPrivate) => props =>
    !isPrivate || authenticated ? (
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

export function Routes({isUserLoggedIn, isAppLoading, Router, Route, Redirect, Switch, pages}) {
  const SecuredRoute = withSecurity(isUserLoggedIn, Route, Redirect);

  if (isAppLoading) {
    return <p>Loading</p>;
  }

  return <Router>
    <Switch>
      {pages.map(props => <SecuredRoute key={props.path} {...props} />)}
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </Router>;
}

const mapStateToProps = state => ({
  isUserLoggedIn: !!state.user.loggedInUser,
  isAppLoading: state.user.checkingLogin
});

export default connect(mapStateToProps)(Routes);
