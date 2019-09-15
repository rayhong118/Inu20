import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var firebaseConfig = {
  apiKey: "AIzaSyDnNt0NLRWbkrSNrErYaGS-cObrENQgPsM",
  authDomain: "dogheadportal.firebaseapp.com",
  databaseURL: "https://dogheadportal.firebaseio.com",
  projectId: "dogheadportal",
  storageBucket: "",
  messagingSenderId: "978501106081",
  appId: "1:978501106081:web:490f0df9d7b02f41"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebaseConfig;