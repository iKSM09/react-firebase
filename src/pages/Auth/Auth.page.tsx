import Register from "../../components/auth/Register.component";
import SignIn from "../../components/auth/SignIn.component";

import { authSection } from "./Auth.module.css";

const Auth = () => {
  return (
    <section className={authSection}>
      <Register />
      <SignIn />
    </section>
  );
};

export default Auth;
