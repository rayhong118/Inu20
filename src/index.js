import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Root from './pages/root';

import rootReducer from './shared/store/reducers/rootReducer';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'

import { createFirestoreInstance, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';

import thunk from 'redux-thunk';

import firebase from 'firebase/app';
import firebaseConfig from './config/firebaseConfig'


const initState = {}
const store = createStore(
  rootReducer,
  initState,
  applyMiddleware(
    thunk.withExtraArgument({ getFirebase, getFirestore})
  )
);

const rrfConfig = {
  userProfile: 'users',
  //useFirestoreForProfile: true
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <Provider store = {store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
       <Root />
    </ReactReduxFirebaseProvider>
  </Provider>, document.getElementById('root'));
