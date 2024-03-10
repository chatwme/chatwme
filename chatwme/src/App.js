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

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <section>
        {user ? <Chat /> : <SignIn />}
      </section>
    </div>
          //wenn User angemeldet sind wird "Chat" gezeigt, ansonsten "SignIn"
  );
}

//ungenutzt
/*const fetchData = async () => {
  const citiesRef = firestore.collection('messages');
  const snapshot = await citiesRef.orderBy('time').limit().get();

  if (snapshot.empty) {
    console.log('Keine übereinstimmenden Dokumente.');
    return [];
  }

  const data = [];
  snapshot.forEach(doc => {
    data.push(doc.data());
  });

  return data;
}*/

function Chat() {
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
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);

  //daten von der datenbank in die messages array uebernehmen
  useEffect(() => {
    const unsubscribe = messagesRef.orderBy('time', 'desc').limit(10).onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setMessages(data);
      setLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  if (messages == null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Chat">
      {messages && [...messages].reverse().map(msg => <ChatMsg side={msg.userid === auth.currentUser.uid ? "right" : "left"} messages={[msg.text]} />)}{/*array umdrehen und anzeigen */}
      <input onChange={handleChange} placeholder="say something nice" />
      <button onClick={handleSubmit} type="submit">🕊️</button>
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
