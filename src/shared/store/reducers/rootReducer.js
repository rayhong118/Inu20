import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { combineReducers } from 'redux';
import restaurantReducer from './restaurantReducer';
import authReducer from '../reducers/authReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  restaurant: restaurantReducer,
  notification: notificationReducer,
  auth: authReducer,
});

export default rootReducer;
