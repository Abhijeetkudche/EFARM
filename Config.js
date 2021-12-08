import firebase from 'firebase/app';
import 'firebase/firestore'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDDpImWUMQmFlXilyhj15LgVfaBfp25E0k",
    authDomain: "efarming-c036b.firebaseapp.com",
    projectId: "efarming-c036b",
    storageBucket: "efarming-c036b.appspot.com",
    messagingSenderId: "735146223662",
    appId: "1:735146223662:web:9b181d78df0fe809e097bf",
    measurementId: "G-3SZQGN6HFJ"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else {
    firebase.app(); // if already initialized, use that one
  }
  const dbh = firebase.firestore();
  
  export default dbh;