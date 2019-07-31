import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from '../presentational/forms/LoginForm';
import Loading from '../presentational/layout/Loading';
import AvatarSelector from '../presentational/forms/AvatarSelector';

const ErrorMessage = ({ children }) => <p className="alert">{children}</p>;

function Register({ isUserLoggedIn, isRegistringUser, error, register }) {
  const [avatar, setAvatar] = useState('boy.svg');

  const handleSubmit = (user) => register({
    ...user,
    avatar
  });

  if (isRegistringUser) {
    return <div className="s-mt--30">
      <Loading />
    </div>;
  }

  if (isUserLoggedIn) {
    return <Redirect to="/" />
  }

  return <div className="layout-grid layout-grid--max-width layout-grid--center s-mt--20">
    <div className="layout-grid__item--11 layout-grid__item--medium-6">
      <h1>Create an account</h1>

      {!!error ? <ErrorMessage>{error}</ErrorMessage> : null}

      <AvatarSelector value={avatar} onChange={setAvatar} />
      <LoginForm submitLabel="register" onLogin={handleSubmit} />
    </div>
  </div>;
}

const mapStateToProps = state => ({
  isUserLoggedIn: !!state.user.loggedInUser,
  isRegistringUser: state.user.isRegistringUser,
  error: state.user.registrationError
});

const mapDispatchToProps = dispatch => ({
  register: (user) => dispatch({ type: 'USER_REGISTER', user })
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);