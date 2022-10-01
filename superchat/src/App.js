import "./App.css";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

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
const firestore = getFirestore(app);

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
    const provider = new auth.GoogleAuthProvider();
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
  const [messages] = useCollection(query, { idField: "id" });
  return (
    <>
      <div>
        {messages &&
          messages.map((message) => (
            <ChatMessage key={message.id} message={message}></ChatMessage>
          ))}
      </div>
    </>
  );
}

function ChatMessage(props) {
  const [text, uid] = props.message;
  return <p>{text}</p>;
}

export default App;
