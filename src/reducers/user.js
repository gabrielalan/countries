
export const initialState = {
  loggedInUser: undefined,
  error: undefined,
};

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'USER_LOGIN_SUCCEEDED':
      return { loggedInUser: action.user };

    case 'USER_LOGIN_FAILED':
      return { ...state, error: action.message };

    default:
      return state;
  }
}