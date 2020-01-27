export const signIn = credential => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth
      .signInWithEmailAndPassword(credential.email, credential.password)
      .then(() => dispatch({ type: 'LOGIN_SUCCESS' }))
      .catch(err => dispatch({ type: 'LOGIN_ERROR', err }));
  };
};
