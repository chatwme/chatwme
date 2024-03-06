import logo from './logo.svg';
import './App.css';
import {useState } from 'react'
import ChatMsg from './chatMsg';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const auth = firebase.auth();
const firestore = firebase.firestore();

firebase.initializeApp({
  apiKey: "AIzaSyB6ALPlZWpPpYiwt5VNzx5LDHaUIo0V91o",
  authDomain: "chatwme-6c657.firebaseapp.com",
  projectId: "chatwme-6c657",
  storageBucket: "chatwme-6c657.appspot.com",
  messagingSenderId: "1095383936548",
  appId: "1:1095383936548:web:7683ba600a7abfef2072b1",
  measurementId: "G-XBPLV8MK6Z"
})

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
        { user ? <Chat /> : <SignIn /> }
      </section>

    </div>

  );
}

function Chat(){
  const messagesRef = firestore.collection('messages');

  const [message, setMessage] = useState('');
  var [text] = Array("Hello");


  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit. with ', message );
    [text] = Array(message);
    await messagesRef.add
  }

  const handleChange = (event) => {
    // 👇 Get input value from "event" and copy to message variable
    setMessage(event.target.value);
  };



  return(
    <div className="Chat">
  <ChatMsg side={"right"} messages={[text]} />
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

  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (

    <button onClick={() => auth.SignOut()}>Sign Out</button>
  )
}
export default App;
//export {firebase, App,}
