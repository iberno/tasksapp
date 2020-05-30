import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCdkew14S-P2-EyFezlvXmI9AOv5ONFHHo",
    authDomain: "todo-ist-1d71a.firebaseapp.com",
    databaseURL: "https://todo-ist-1d71a.firebaseio.com",
    projectId: "todo-ist-1d71a",
    storageBucket: "todo-ist-1d71a.appspot.com",
    messagingSenderId: "1040643977545",
    appId: "1:1040643977545:web:b56470d62fadf609116a98"
});

export { firebaseConfig as firebase };