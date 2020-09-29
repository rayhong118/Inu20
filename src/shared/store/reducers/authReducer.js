import { authActionConst } from '../actions/authActions';

const initState = {
  authError: null,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authActionConst.REGISTRATION_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case authActionConst.REGISTRATION_ERROR:
      return {
        ...state,
        authError: action.err.message,
      };
    case authActionConst.AUTH_ERROR:
      return {
        ...state,
        authError: action.err.message,
      };
    case authActionConst.LOGIN_SUCCESS:
      return { ...state, authError: null };
    case authActionConst.SIGNOUT_SUCCESS:
      return state;
    case authActionConst.CLEAR_AUTH_ERROR:
      return { ...state, authError: action.errorMessage };
    default:
      return state;
  }
};

export default authReducer;
