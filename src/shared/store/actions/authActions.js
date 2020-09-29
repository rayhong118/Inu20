import firebase from 'firebase/app';

export const authActionConst = {
  REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS',
  REGISTRATION_ERROR: 'REGISTRATION_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  AUTH_ERROR: 'AUTH_ERROR',
  SIGNOUT_SUCCESS: 'SIGNOUT_SUCCESS',
  CLEAR_AUTH_ERROR: 'CLEAR_AUTH_ERROR',
};

export const register = (credential) => {
  return (dispatch, getState) => {
    /*if (credential.password !== credential.repPassword) {
      dispatch({
        type: 'REGISTRATION_ERROR',
        err: 'Password and repeated password should match.',
      });
    } else*/

    firebase
      .auth()
      .createUserWithEmailAndPassword(credential.email, credential.password)
      .then((res) => {
        if (res.user) {
          res.user.sendEmailVerification();
          dispatch({ type: 'REGISTRATION_SUCCESS' });
        } else throw res.error;
      })
      .catch((err) => {
        dispatch({ type: 'REGISTRATION_ERROR', err });
      });
  };
};

export const signIn = (credential) => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credential.email, credential.password)
      .then(() => dispatch({ type: 'LOGIN_SUCCESS' }))
      .catch((err) => dispatch({ type: 'AUTH_ERROR', err }));
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      });
  };
};

export const setAuthError = (errorMessage = '') => {
  return (dispatch, getState) => dispatch({ type: 'CLEAR_AUTH_ERROR', errorMessage });
};
