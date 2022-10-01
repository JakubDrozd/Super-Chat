import logo from "./logo.svg";
import "./App.css";
//Firebase SDK
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//Firebase Hooks
import { useAuthState } from "react-firebase-hooks-auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
