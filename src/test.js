import firebase from 'firebase/app';

import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('1y7mWUXtp7HZv25qF3R5').collection('cartItmes');

firestore.doc('/users/1y7mWUXtp7HZv25qF3R5/cartItems/cPbEEqrf0w4MKJizAZQ9');

firestore.collection('/users/1y7mWUXtp7HZv25qF3R5/cartItems');