import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyDdRR7pjjahg5XRbxR91T10yrwjMFV3Zfs",
    authDomain: "bus-iot-quevedo.firebaseapp.com",
    databaseURL: "https://bus-iot-quevedo-default-rtdb.firebaseio.com",
    projectId: "bus-iot-quevedo",
    storageBucket: "bus-iot-quevedo.appspot.com",
    messagingSenderId: "1015949523306",
    appId: "1:1015949523306:web:733c0f8ab4c19d24514d13",
    measurementId: "G-LKDEVH62FP"
  };

firebase.initializeApp(config);
export const db = firebase.database();