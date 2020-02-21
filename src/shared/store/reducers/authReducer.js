const initState = {
  authError: null,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: action.err.message,
      };
    case 'LOGIN_SUCCESS':
      return { ...state, authError: null };
    case 'SIGNOUT_SUCCESS':
      return state;
    case 'CLEAR_AUTH_ERROR':
      return { ...state, authError: null };
    default:
      return state;
  }
};

export default authReducer;
