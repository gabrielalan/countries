import { all, put } from "@redux-saga/core/effects";

import userSagas from "./user";

export default function* rootSaga() {
  yield all([
    ...userSagas
  ]);

  yield put({ type: 'APP_STARTED' });
}