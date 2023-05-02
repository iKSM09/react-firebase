import React, { useState } from "react";
import { auth, signInUser } from "../utils/firebase/auth.utils";
import { FieldError, FieldErrors, useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

  const { register, handleSubmit, formState, reset } = useForm<SignInFormType>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const { errors, isValid, isDirty, isSubmitting } = formState;

  console.log(auth?.currentUser?.email);

  const onSubmit = async (data: SignInFormType) => {
    console.log("onSubmit: ", data);
    await signInWithEmailAndPassword(data.email, data.password);
    reset();
  };

  const onError = (errors: FieldErrors<SignInFormType>) => {
    console.error("onError: ", errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <h2 className="text-center">Sign In</h2>
      <div className="input_container">
        <label htmlFor="email">Email:</label>
        <div>
          <input type="email" {...register("email")} placeholder="Email" />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
      </div>

      <div className="input_container">
        <label htmlFor="password">Password:</label>
        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
      </div>

      <button type="submit" color="blue" disabled={!isDirty || isSubmitting}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
      {error && <span>{error.message}</span>}
    </form>
  );
};

export default SignIn;
