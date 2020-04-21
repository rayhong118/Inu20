import firebase from 'firebase/app';
export const signIn = (credential) => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credential.email, credential.password)
      .then(() => dispatch({ type: 'LOGIN_SUCCESS' }))
      .catch((err) => dispatch({ type: 'LOGIN_ERROR', err }));
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

export const clearAuthError = () => {
  return (dispatch, getState) => dispatch({ type: 'CLEAR_AUTH_ERROR' });
};
