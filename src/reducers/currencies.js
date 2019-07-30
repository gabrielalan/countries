
export const initialState = {
  isLoading: true
};

export const currenciesActionTypes = {
  loadSucceeded: 'CURRENCIES_LOAD_SUCCEEDED',
  loadFailed: 'CURRENCIES_LOAD_FAILED',
};

export const createLoadSucceededAction = data => ({ type: currenciesActionTypes.loadSucceeded, data });
export const createLoadFailedAction = error => ({ type: currenciesActionTypes.loadFailed, error });

export default function currenciesReducer(state = {}, action) {
  switch (action.type) {
    case 'CURRENCIES_LOAD_SUCCEEDED':
      return { ...action.data };

    case 'CURRENCIES_LOAD_FAILED':
      return { error: action.error };

    default:
      return state;
  }
}