import React, { useEffect, useState } from "react";
import "./App.css";
import firebaseConfig from "./firebaseConfig";
import firebase from "firebase";

import Page from "../src/components/Page";

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, updateUser] = useState(null);
  const [show, showHidePage] = useState(false);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     updateUser(user);
  //   });
  // }, [user]);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    showHidePage(true);
  };

  const handleLogOut = async () => {
    await firebase.auth().signOut();
    showHidePage(false);
  };

  return (
    <div>
      {!user ? (
        <button className='btn' onClick={handleSignIn}>
          SignIn
        </button>
      ) : (
        <button className='btn' onClick={handleLogOut}>
          SignOut
        </button>
      )}
      {show ? <Page /> : <div></div>}
    </div>
  );
}

export default App;
