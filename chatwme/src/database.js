import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



import firebase from "firebase/app";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592git 

const firebaseConfig = {

    apiKey: "AIzaSyB6ALPlZWpPpYiwt5VNzx5LDHaUIo0V91o",
  
    authDomain: "chatwme-6c657.firebaseapp.com",
  
    projectId: "chatwme-6c657",
  
    storageBucket: "chatwme-6c657.appspot.com",
  
    messagingSenderId: "1095383936548",
  
    appId: "1:1095383936548:web:7683ba600a7abfef2072b1",
  
    measurementId: "G-XBPLV8MK6Z"
  
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


class Login {
    constructor (login_name, login_password, login_id ) {
        this.login_name = login_name;
        this.login_password = login_password;
        this.login_id = login_id;
    }

    getlogin_name() {
        return this.login_name;
    }

    getlogin_password(){
        return this.login_password;
    }
    getlogin_id (){
        return this.login.id;
    }

    setlogin_name(newname){
        this.login_name = newname;
    }

    setlogin_password(newpassword){
        this.login_name = newpassword;
    }    
    
    setlogin_id(newid){
    	this.login_id = newid;
    }
}
    db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    }
    const login = doc(firestore, 'special');
    function writeLogin(){
        const docData = {
            name: ''
        }
    }
    
}
// Firestore data converter
// var loginconverter = {
//     toFirestore: function(login) {
//         return {
//             login_name: login.login_name,
//             login_password: login.login_password,
//             login_id: login.login_id
//             };
//     }
// }