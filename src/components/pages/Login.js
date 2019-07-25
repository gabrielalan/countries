import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from '../presentational/forms/LoginForm';

const ErrorMessage = () => <p className="alert">
  Username not found. If you don't have an account you can <Link to="register">register clicking the button</Link> below.
</p>;

function Home({ isUserLoggedIn, error, performLogin }) {
  if (isUserLoggedIn) {
    return <Redirect to="/" />
  }

  return <div className="layout-grid layout-grid--max-width layout-grid--center s-mt--20">
    <div className="layout-grid__item--6">
      <h1>Log into your account</h1>

      {!!error ? <ErrorMessage /> : null}

      <LoginForm onLogin={performLogin} />
    </div>
  </div>;
}

const mapStateToProps = state => ({
  isUserLoggedIn: !!state.user.loggedInUser,
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  performLogin: (user) => dispatch({ type: 'USER_LOGIN', user })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);