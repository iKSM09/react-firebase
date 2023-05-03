import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { auth } from "../../utils/firebase/auth.utils";
import styles from "./Auth.module.css";

type FormDataType = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    email: z
      .string()
      .nonempty("Email is required.")
      .email("Email format is not valid"),
    password: z
      .string()
      .nonempty("Password is required.")
      .min(6, "Password must be greater than 6 characters.")
      .max(30, "Password must be lesser than 30 characters."),
    confirmPassword: z.string().nonempty("Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  console.log({ user });

  const { register, handleSubmit, formState, reset } = useForm<FormDataType>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const { errors, isDirty, isSubmitting } = formState;

  const onSubmitSuccess = async (data: FormDataType) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    reset();
  };

  const onSubmitError = (errors: FieldErrors<FormDataType>) => {
    console.error(errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}
      className={styles.formContainer}
    >
      <h2 className="text-center">Register</h2>
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
        </div>
      </div>

      <div className={styles.formField}>
        <label htmlFor="confirmPassword">Password Again:</label>
        <div className={styles.inputContainer}>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <span className={styles.errorText}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>

      <button type="submit" color="blue" disabled={!isDirty || isSubmitting}>
        {loading ? "Creating..." : "Create Account"}
      </button>
      {error && <span className={styles.errorText}>{error.message}</span>}
    </form>
  );
};

export default Register;
