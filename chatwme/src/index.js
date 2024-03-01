import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from  './Login'
import reportWebVitals from './reportWebVitals';

//import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
//import {getFirestore} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


//const firestore = getFirestore(firebaseApp);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <><RouterProvider router={router} /><React.StrictMode>
    <App />
  </React.StrictMode></>
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
