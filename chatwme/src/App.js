import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import ChatMsg from './chatMsg';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { serverTimestamp, getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyB6ALPlZWpPpYiwt5VNzx5LDHaUIo0V91o",
  authDomain: "chatwme-6c657.firebaseapp.com",
  projectId: "chatwme-6c657",
  storageBucket: "chatwme-6c657.appspot.com",
  messagingSenderId: "1095383936548",
  appId: "1:1095383936548:web:7683ba600a7abfef2072b1",
  measurementId: "G-XBPLV8MK6Z"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>

      <section>
        {user ? <Chat /> : <SignIn />}
      </section>

    </div>

  );
}

const fetchData = async () => {
  const citiesRef = firestore.collection('messages');
  const snapshot = await citiesRef.where('userid', '==', 123).get();

  if (snapshot.empty) {
    console.log('Keine übereinstimmenden Dokumente.');
    return [];
  }  

  const data = [];
  snapshot.forEach(doc => {
    data.push(doc.data());
  });

  return data;
}
function Chat() {
  //initialize variables
  const messagesRef = firestore.collection("messages");
  const [message, setMessage] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit. with ', message);
    const res = messagesRef.add({ text: message, userid: auth.currentUser.uid, time: serverTimestamp() });
    console.log('Added document with ID: ', res.id);
  }

  const handleChange = (event) => {
    // 👇 Get input value from "event" and copy to message variable
    setMessage(event.target.value);
  };
  fetchData().then(data => console.log(data));

  return (
    <div className="Chat">
      
      <input onChange={handleChange} placeholder="say something nice" />
      <button onClick={handleSubmit} type="submit">🕊️</button>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (

    <button onClick={() => auth.SignOut()}>Sign Out</button>
  )
}
function writeLogin() {
  const login = firestore.doc(firestore, 'special');//du dummer nutten 
  const docData = {
    name: 'Jonas',
    password: '1234',
    id: '187'
  };
  firestore.setDoc(login, docData);
}

export default App;
//export {firebase, App,}
