import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
 apiKey: "AIzaSyAcfP8_1wQ8c3atc5WnrCXCto8Gi1v2FZ0",
 authDomain: "crwn-db-6711a.firebaseapp.com",
 databaseURL: "https://crwn-db-6711a.firebaseio.com",
 projectId: "crwn-db-6711a",
 storageBucket: "crwn-db-6711a.appspot.com",
 messagingSenderId: "243694284954",
 appId: "1:243694284954:web:c5158149a41adfbd976f23",
 measurementId: "G-GZHEL1WZKV"
};

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;