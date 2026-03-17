const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyAdJfYLpUWiuVpfPSjJvy8AhK8waShCufA",
    authDomain: "quntamlayerai.firebaseapp.com",
    projectId: "quntamlayerai",
    storageBucket: "quntamlayerai.firebasestorage.app",
    messagingSenderId: "762818913156",
    appId: "1:762818913156:web:62b9740d5def777dda73d1",
    measurementId: "G-2RX3TZ50Y8"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

module.exports = { db, firebase };
