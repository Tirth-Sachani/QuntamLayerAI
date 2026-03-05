const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyB7TU51XzAqbCnjuT-8RU2PXOSCUqVt8S4",
    authDomain: "vitaflowstcak-com.firebaseapp.com",
    projectId: "vitaflowstcak-com",
    storageBucket: "vitaflowstcak-com.firebasestorage.app",
    messagingSenderId: "135830845952",
    appId: "1:135830845952:web:964e28b75a904a5f8176e5",
    measurementId: "G-XR14388F5H"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

module.exports = { db, firebase };
