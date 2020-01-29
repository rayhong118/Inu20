import firebase from 'firebase';
export const signIn = credential => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credential.email, credential.password)
      .then(() => dispatch({ type: 'LOGIN_SUCCESS' }))
      .catch(err => dispatch({ type: 'LOGIN_ERROR', err }));
  };
};
