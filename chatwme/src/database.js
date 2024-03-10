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

// Klasse erstellen mit notwendiggen Login informationen 
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


function uploadToFirestore(loginObject) {
    
    const db = firebase.firestore(); // Referenz auf die Firestore-Datenbank erstellen
    
    
    const loginsRef = db.collection('logins'); // Eine neue Sammlung "logins" in der Firestore-Datenbank erstellen
    
    // Ein neues Dokument mit den Attributen des Login-Objekts erstellen und in die Sammlung hochladen
    loginsRef.add({
        login_name: loginObject.getlogin_name(),
        login_password: loginObject.getlogin_password(),
        login_id: loginObject.getlogin_id()
    })
    .then((docRef) => {
        console.log("Dokument mit der ID:", docRef.id, "erfolgreich hochgeladen");
    })
    .catch((error) => {
        console.error("Fehler beim Hochladen des Dokuments:", error);
    });
}


//     const firestore = getFirestore();    // Test 

//     const login = doc(firestore, 'special');
//     function writeLogin(){
//         const docData = {
//             name: 'Jonas',
//             password: '1234',
//             id: '187'
//         };
//         setDoc(login, docData); 
//     }
    
// writeLogin ();

