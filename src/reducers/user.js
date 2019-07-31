
export const initialState = {
  loggedInUser: undefined,
  loginError: undefined,
  registrationError: undefined,
  checkingLogin: false,
  isRegistringUser: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'APP_STARTED':
    case 'USER_LOGIN':
      return { ...state, checkingLogin: true };

    case 'USER_REGISTER':
      return { ...state, isRegistringUser: true };

    case 'USER_CHECKED':
    case 'USER_LOGIN_SUCCEEDED':
    case 'USER_REGISTER_SUCCEEDED':
      return { loggedInUser: action.user, checkingLogin: false, isRegistringUser: false };

    case 'USER_LOGIN_FAILED':
      return { ...state, loginError: action.message, checkingLogin: false, isRegistringUser: false };

    case 'USER_REGISTER_FAILED':
      return { ...state, registrationError: action.message, checkingLogin: false, isRegistringUser: false };

    case 'USER_LOGOUT_SUCCEEDED':
      return initialState;

    default:
      return state;
  }
}