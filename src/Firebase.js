import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDuEkHy17qhe_n8L_DthMTeHVBw6p0x2uI",
  authDomain: "react-spas-6a5c2.firebaseapp.com",
  databaseURL: "https://react-spas-6a5c2.firebaseio.com",
  projectId: "react-spas-6a5c2",
  storageBucket: "react-spas-6a5c2.appspot.com",
  messagingSenderId: "467419368997",
  appId: "1:467419368997:web:c52f8284b79b03748779cc",
  measurementId: "G-58M9QF4B81"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
