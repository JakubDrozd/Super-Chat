import "./App.css";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
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
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg}></ChatMessage>
          ))}
      </div>
      <form>
        <input type="text" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
}

export default App;
