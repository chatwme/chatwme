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


class login {
    constructor (login_name, login_password, login_id ) {
        this.login_name = login_name;
        this.login_password = login_password;
        this.login_id = login_id;
    }
    toString() {
        return this.name + ', ' + this.state + ', ' + this.country;
    }
}

// Firestore data converter
var cityConverter = {
    toFirestore: function(city) {
        return {
            name: city.name,
            state: city.state,
            country: city.country
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new City(data.name, data.state, data.country);
    }
    
    // Set with cityConverter
db.collection("cities").doc("LA")
.withConverter(cityConverter)
.set(new City("Los Angeles", "CA", "USA"));
};