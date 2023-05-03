import {
  auth,
  signInWithGoogle,
  signOutUser,
} from "../../utils/firebase/auth.utils";

import style from "./Navigation.module.css";
import { useAuthState } from "react-firebase-hooks/auth";

const Navigation = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className={style.navBar}>
      <div className={style.flex}>
        <h3>
          Hello!{" "}
          <span className={user ? style.textWhite : ""}>
            {user?.email?.split("@")[0] || "from React Firebase"}
          </span>
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
