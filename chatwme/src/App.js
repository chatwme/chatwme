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



function App() {
  const [message, setMessage] = useState('');
  var [text] = Array("Hello");


  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit. with ', message );
    [text] = Array(message);
  }

  const handleChange = (event) => {
    // 👇 Get input value from "event"
    setMessage(event.target.value);
  };

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
        <ChatMsg side={"right"} messages={[text]} />
        <input onChange={handleChange} placeholder="say something nice" />

        <button onClick={handleSubmit} type="submit">🕊️</button>

      </header>
    </div>

  );
}


export default App;
