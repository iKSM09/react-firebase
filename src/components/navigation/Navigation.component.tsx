import React from "react";
import {
  auth,
  signInWithGoogle,
  signOutUser,
} from "../../utils/firebase/auth.utils";

import { navBar, flex, textCenter } from "./Navigation.module.css";
import { useAuthState } from "react-firebase-hooks/auth";

const Navigation = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <nav className={navBar}>
      <div className={flex}>
        <h3>
          Hello!{" "}
          <small className={textCenter}>
            {auth?.currentUser?.email || "from React Firebase"}
          </small>
        </h3>
      </div>
      {!user ? (
        <button onClick={signInWithGoogle} color="blue">
          Sign in with Google
        </button>
      ) : (
        <button onClick={signOutUser}>Logout</button>
      )}
    </nav>
  );
};

export default Navigation;
