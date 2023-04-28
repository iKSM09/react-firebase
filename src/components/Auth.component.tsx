import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth, googleProvider } from "../utils/firebase/firebase.utils";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("signIn: ", error);
    }
  };

  const signInwithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("googleSignIn: ", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("signOut: ", error);
    }
  };

  return (
    <div className="flex">
      <div className="input_container">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>

      <div className="input_container">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className="flex-col">
        <button onClick={signInwithGoogle} color="blue">
          Sign in with Google
        </button>
        <button onClick={signIn} color="blue">
          Sign In
        </button>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Auth;
