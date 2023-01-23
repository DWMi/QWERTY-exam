import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout.js";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { getError } from "../utils/error.js";
import { useRouter } from "next/router.js";
import { Abel } from "@next/font/google";

const fontStyle = Abel({ weight: "400", subnets: ["sans-serif"] });

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      console.log("User is logged in!");
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        console.log(result.error);
      }
    } catch (err) {
      console.log(getError(err));
    }
  };
  return (
    <div className={styles.LoginFormContainer}>
      <form className={styles.LoginForm} onSubmit={handleSubmit(submitHandler)}>
        <h1 className={styles.LoginTitle}>Login</h1>
        <input
          className={styles.LoginEmailInput}
          placeholder="Email"
          type="email"
          {...register("email", {
            required: "Please enter your email",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              message: "Please enter a valid email",
            },
          })}
          id="email"
          autoFocus
        ></input>
        {errors.email && (
          <div className={styles.LoginEmailInputErrorMessage}>
            <p>{errors.email.message}</p>
          </div>
        )}
        <input
          className={styles.LoginPasswordInput}
          placeholder="Password"
          type="password"
          {...register("password", {
            required: "Please enter your password",
            minLength: {
              value: 5,
              message: "Password must be longer that 5 characters",
            },
          })}
          id="password"
        ></input>
        {errors.password && (
          <div className={styles.LoginPasswordInputErrorMessage}>
            <p>{errors.password.message}</p>
          </div>
        )}
        <button className={styles.LoginButton}>Login</button>
        <div className={styles.LoginRedirectToRegisterContainer}>
          <p>Don't have an account?</p> <br></br>
          <p>
            Click{" "}
            <Link
              className={styles.LoginLinkToRegister}
              href={`/register?redirect=${redirect || "/"}`}
            >
              here
            </Link>{" "}
            to register.
          </p>
        </div>
      </form>
    </div>
  );
}
