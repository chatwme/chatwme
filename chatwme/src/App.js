import './App.css';
import { useState, useEffect } from 'react';
import ChatMsg from './chatMsg';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { serverTimestamp } from 'firebase/firestore';

firebase.initializeApp({
  //Verbindung zu firebase
  apiKey: "AIzaSyB6ALPlZWpPpYiwt5VNzx5LDHaUIo0V91o",
  authDomain: "chatwme-6c657.firebaseapp.com",
  projectId: "chatwme-6c657",
  storageBucket: "chatwme-6c657.appspot.com",
  messagingSenderId: "1095383936548",
  appId: "1:1095383936548:web:7683ba600a7abfef2072b1",
  measurementId: "G-XBPLV8MK6Z"
})
//initialisiere die firebase datenbank und google login
const auth = firebase.auth();
const firestore = firebase.firestore(); 

//main methode
function App() {
  const [user] = useAuthState(auth);//in user wird geschriben ob der user eingelogt ist 

  return (
    <div className="App">
      <section>
        {user ? <Chat /> : <SignIn />}
      </section>
    </div>
    //wenn User angemeldet sind wird "Chat" gezeigt, ansonsten "SignIn"
  );
}


function Chat() {

  const messagesRef = firestore.collection("messages");//connecten mit der messages datenbank in firebase
  const [message, setMessage] = useState('');//wird gespeichert was im textfeld steht
  const [messages, setMessages] = useState(null);//alle nachrichten aus der datenbank

  const onChange=(event) => {
    setMessage(event.target.value);
  }

  function handleSubmit(event) {//beim druecken vom Button wird submit ausgefuhrt
    event.preventDefault();
    //ein neues document in der firebase datenbank messages anlegen mit jeweiligen argumenten
    const res = messagesRef.add({ text: message, userid: auth.currentUser.uid, time: serverTimestamp(), displayName: auth.currentUser.displayName });
    setMessage('');//loesche die nachricht aus dem textfeld
  }
  //wenn eine Tastegedrueckt wird
  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){//wenn die Taste enter ist schicke die nachricht im textfeld
      handleSubmit(event);
    }
  };

  //daten von der datenbank in die messages array uebernehmen, letzten 20 nachrichten sortiert nach der zeit
  useEffect(() => {
    const unsubscribe = messagesRef.orderBy('time', 'desc').limit(20).onSnapshot(snapshot => {//limit nicht aendern oder unten auch aendern
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setMessages(data);
    });
    // warten bis alles copiert ist
    return () => unsubscribe();
  }, []);

  //gucken ob messages ueberhaubt nachrichten enthaelt
  if (messages == null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Chat">
      {messages && [...messages].reverse().map((msg, i) => {//umdrehen des arrays um in der richtigen reihenfolge die nachrichten anzuzeigen
        const previousMsg = i > 0 ? messages[20- i] : null;//20- i weil array ist andersherum 20 weil wir letzten 20 messages abrufen
        return (//anzeigen von den nachrichten in dem ChatMsg style
          <ChatMsg
            side={msg.userid === auth.currentUser.uid ? "right" : "left"}//check ob der jetzige nutzer die nachricht abgeschickt hat, dann rechts anzeigen
            messages={[msg.text]}
            username={(previousMsg && msg.userid === previousMsg.userid) ?  "" : msg.displayName }//check ob die vorherige nachricht vom gleichen benutzer gesendet wurde, dann den Nutzernamen nicht anzeigen
          />
        );
      })}
      <input value={message} onChange={onChange} onKeyPress={handleKeyPress}  placeholder="Schreibe einen Text" />{/*Text im texfeld wird in message copiert*/}
      <button onClick={handleSubmit} type="submit"><img src="https://cdn-icons-png.flaticon.com/512/149/149446.png" width="10" height="10"/></button>
    </div>
  );
}

function SignIn() {

  //firebase Coding für Google-Login
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

export default App;
