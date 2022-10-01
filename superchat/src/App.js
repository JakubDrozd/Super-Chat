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

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header></header>
      <section>{user ? <ChatRoom></ChatRoom> : <SignIn></SignIn>}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && (
      <button
        onClick={() => {
          auth.signOut();
        }}
      ></button>
    )
  );
}

function ChatRoom() {
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
}

export default App;
