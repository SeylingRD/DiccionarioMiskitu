import firebase from 'firebase' ; 
import "firebase/firestore";

const config ={
  
    apiKey: "AIzaSyDZTdJ_E5rOpvUsH5XysDfipRQEwaTRfqs",
    authDomain: "miskitu-498ef.firebaseapp.com",
    projectId: "miskitu-498ef",
    storageBucket: "miskitu-498ef.appspot.com",
    messagingSenderId: "141525198715",
    appId: "1:141525198715:web:049d0b90573a09d131bfde" 

};
// Initialize Firebase
firebase.initializeApp(config);

const db = firebase.firestore();

export default {
    firebase,
    db
};
