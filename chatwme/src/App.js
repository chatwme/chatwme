import logo from './logo.svg';
import './App.css';
import {useState } from 'react'

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
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit. with ', message );
  }

  const handleChange = (event) => {
    // 👇 Get input value from "event"
    setMessage(event.target.value);
  };

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
        <input onChange={handleChange} placeholder="say something nice" />

        <button onClick={handleSubmit} type="submit">🕊️</button>

      </header>

      <section>
        { user ? <""/> : <SignIn /> }
      </section>
      
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
