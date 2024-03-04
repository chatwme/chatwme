import logo from './logo.svg';
import './App.css';
import {useState } from 'react'
import ChatMsg from './chatMsg';



function App() {
  const [message, setMessage] = useState('');
  const [text] = Array("Hello");
  function MessageBox(message){
    return(<a>{message}</a>)
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit. with ', message );
    message.push(text);
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
        {text && text.map(msg => <ChatMsg side={"right"} message={text} />)}
        <input onChange={handleChange} placeholder="say something nice" />

        <button onClick={handleSubmit} type="submit">🕊️</button>

      </header>
    </div>

  );
}


export default App;
