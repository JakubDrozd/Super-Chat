import "./App.css";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  orderBy,
  limit,
  query,
  onSnapshot,
  doc,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStageChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyA6Ru0mlhOrEJyIdBZ5UF1OlZAFd3kqdqc",
  authDomain: "super-chat-331c3.firebaseapp.com",
  projectId: "super-chat-331c3",
  storageBucket: "super-chat-331c3.appspot.com",
  messagingSenderId: "402521353323",
  appId: "1:402521353323:web:c0c6a6c891725d6fa8952e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function loadMessages() {
  const colRef = collection(db, "messages");
  const docsSnap = await getDocs(colRef);
  docsSnap.forEach((message) => {
    <ChatMessage key={message.id} message={message}></ChatMessage>;
  });
}

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
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
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
  return (
    <>
      <div>{loadMessages()}</div>
    </>
  );
}

function ChatMessage(props) {
  const [text, uid] = props.message;
  return <p>{text}</p>;
}

export default App;
