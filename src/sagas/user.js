import { call, takeLatest, put } from "@redux-saga/core/effects";
import { authenticateUser, getAuthenticatedUser, registerUser, logUserOut } from "../api/users/authentication";

function* checkUserLogin() {
  let user;

  try {
    user = yield call(getAuthenticatedUser, window.localStorage);
  } catch(e) {
    // no user logged in
  } finally {
    yield put({ type: 'USER_CHECKED', user });
  }
}

function* performUserLogin(action) {
  try {
    const user = yield call(authenticateUser, window.localStorage, action.user);

    yield put({ type: 'USER_LOGIN_SUCCEEDED', user: user });
  } catch(e) {
    yield put({ type: 'USER_LOGIN_FAILED', message: e.message });
  }
}

function* performRegistration(action) {
  try {
    const user = yield call(registerUser, window.localStorage, action.user);

    yield put({ type: 'USER_REGISTER_SUCCEEDED', user: user });
  } catch(e) {
    yield put({ type: 'USER_REGISTER_FAILED', message: e.message });
  }
}

function* performLogOut() {
  try {
    yield call(logUserOut, window.localStorage);
    yield put({ type: 'USER_LOGOUT_SUCCEEDED' });
  } catch(e) {
    yield put({ type: 'USER_LOGOUT_FAILED', message: e.message });
  }
}

export default [
  takeLatest('APP_STARTED', checkUserLogin),
  takeLatest('USER_LOGIN', performUserLogin),
  takeLatest('USER_REGISTER', performRegistration),
  takeLatest('USER_LOGOUT', performLogOut),
];