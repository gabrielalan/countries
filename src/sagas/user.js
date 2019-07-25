import { takeLatest, put } from "@redux-saga/core/effects";

function* performUserLogin(action) {
  try {
    if (action.user.user !== 'gaba') {
      throw new Error('Wrong user');
    }

    yield put({ type: 'USER_LOGIN_SUCCEEDED', user: action.user });
  } catch(e) {
    yield put({ type: 'USER_LOGIN_FAILED', message: e.message });
  }
}

export default [
  takeLatest('USER_LOGIN', performUserLogin)
];