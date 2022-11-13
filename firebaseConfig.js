import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCC2SRxZXrcC8iXC60ngDG7DYGYDtGn9gU",
  authDomain: "market-c0d0a.firebaseapp.com",
  projectId: "market-c0d0a",
  storageBucket: "market-c0d0a.appspot.com",
  messagingSenderId: "680788769118",
  appId: "1:680788769118:web:8496482bb0af52f381b7cf"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }