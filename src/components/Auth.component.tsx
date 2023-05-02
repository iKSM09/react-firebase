import Register from "./Register.component";
import SignIn from "./SignIn.component";

import { authSection } from "./Auth.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase/auth.utils";

const Auth = () => {
  const [user, loading, error] = useAuthState(auth);

  if (!user) {
    return (
      <section className={authSection}>
        <Register />
        <SignIn />
      </section>
    );
  }
};

export default Auth;
