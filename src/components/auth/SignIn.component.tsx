import { auth } from "../../utils/firebase/auth.utils";
import { FieldErrors, useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./Auth.module.css";

type SignInFormType = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Email format is not valid"),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(6, "Password must be greater than 6 characters.")
    .max(30, "Password must be lesser than 30 characters."),
});

const SignIn = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  console.log({ user });

  const { register, handleSubmit, formState, reset, resetField } =
    useForm<SignInFormType>({
      mode: "onBlur",
      defaultValues: {
        email: "",
        password: "",
      },
      resolver: zodResolver(schema),
    });

  const { errors, isDirty, isSubmitting } = formState;

  const onSubmit = async (data: SignInFormType) => {
    console.log("onSubmit: ", data);
    await signInWithEmailAndPassword(data.email, data.password);

    if (error) console.error("firebaseError: ", error);
    if (error?.message.includes("wrong-password"))
      resetField("password", {
        keepError: true,
        keepDirty: true,
        keepTouched: true,
      });

    if (user) reset();
  };

  const onError = (errors: FieldErrors<SignInFormType>) => {
    console.error("onError: ", errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={styles.formContainer}
    >
      <h2 className="">Sign In</h2>
      <div className={styles.formField}>
        <label htmlFor="email">Email:</label>
        <div className={styles.inputContainer}>
          <input type="email" {...register("email")} placeholder="Email" />
          {errors.email && (
            <span className={styles.errorText}>{errors.email.message}</span>
          )}
        </div>
      </div>

      <div className={styles.formField}>
        <label htmlFor="password">Password:</label>
        <div className={styles.inputContainer}>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && (
            <span className={styles.errorText}>{errors.password.message}</span>
          )}
          {error?.message.includes("wrong-password") && (
            <span className={styles.errorText}>Password is incorrect.</span>
          )}
        </div>
      </div>

      <button type="submit" color="blue" disabled={!isDirty || isSubmitting}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default SignIn;
