import 'firebase/firestore';
import 'firebase/auth';

import { firebaseApiKey } from './apikeys';

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: 'dogheadportal.firebaseapp.com',
  databaseURL: 'https://dogheadportal.firebaseio.com',
  projectId: 'dogheadportal',
  storageBucket: 'dogheadportal.appspot.com',
  messagingSenderId: '978501106081',
  appId: '1:978501106081:web:490f0df9d7b02f41',
};

export default firebaseConfig;
