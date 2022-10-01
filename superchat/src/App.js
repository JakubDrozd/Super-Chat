import logo from "./logo.svg";
import "./App.css";
//Firebase SDK
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//Firebase Hooks
import { useAuthState } from "react-firebase-hooks-auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyA6Ru0mlhOrEJyIdBZ5UF1OlZAFd3kqdqc",
  authDomain: "super-chat-331c3.firebaseapp.com",
  projectId: "super-chat-331c3",
  storageBucket: "super-chat-331c3.appspot.com",
  messagingSenderId: "402521353323",
  appId: "1:402521353323:web:c0c6a6c891725d6fa8952e",
});

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
