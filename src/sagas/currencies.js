import { call, takeLatest, put } from "@redux-saga/core/effects";
import { createLoadFailedAction, createLoadSucceededAction } from "../reducers/currencies";

function* loadCurrencies() {
  try {
    const response = yield call(fetch, 'https://api.exchangeratesapi.io/latest');
    const responseBody = yield response.json();

    yield put(createLoadSucceededAction(responseBody));
  } catch (e) {
    yield put(createLoadFailedAction(e.message));
  }
}

export default [
  takeLatest('APP_STARTED', loadCurrencies),
];