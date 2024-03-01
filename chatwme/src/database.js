import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import firebase from "firebase/app";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    FIREBASE_CONFIGURATION
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
        
    }
}
// Firestore data converter
var loginconverter = {
    toFirestore: function(login) {
        return {
            login_name: login.login_name,
            login_password: login.login_password,
            login_id: login.login_id
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Login(data.login_name, data.login_password, data.login_id);
    }
    
    // Set with cityConverter
db.collection("cities").doc("LA")
.withConverter(cityConverter)
.set(new City("Los Angeles", "CA", "USA"));
};