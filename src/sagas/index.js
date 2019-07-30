import { all, put } from "@redux-saga/core/effects";

import userSagas from "./user";
import countriesSagas from "./countries";
import currenciesSagas from "./currencies";

export default function* rootSaga() {
  yield all([
    ...userSagas,
    ...countriesSagas,
    ...currenciesSagas,
  ]);

  yield put({ type: 'APP_STARTED' });
}