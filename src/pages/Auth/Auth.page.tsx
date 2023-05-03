import Register from "../../components/auth/Register.component";
import SignIn from "../../components/auth/SignIn.component";

import style from "./Auth.module.css";

const Auth = () => {
  return (
    <section className={style.authSection}>
      <Register />
      <SignIn />
    </section>
  );
};

export default Auth;
