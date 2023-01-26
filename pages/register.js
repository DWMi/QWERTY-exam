import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout.js";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { getError } from "../utils/error.js";
import { useRouter } from "next/router.js";
import axios from "axios";
import Head from "next/head";

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
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({
    email,
    firstName,
    lastName,
    address,
    password,
  }) => {
    try {
      await axios.post("api/auth/signup", {
        email,
        firstName,
        lastName,
        address,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <>
      <Head>
        <title>QWERTY - Register</title>
        <meta name="description" content="QWERTY - Your one-stop shop for custom built mechanical keyboards, accessories, and more. We specialize in Keychron, Ducky, Yunzii, Varmilo and other mechanical keyboard brands."/>
        <meta name="keywords" content="mechanical keyboard, custom keyboard, Keychron, Ducky, Yunzii, Varmilo, keyboard accessories"/>
        <meta name="robots" content="index, follow"/>
        <meta name="author" content="QWERTY"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.LoginFormContainer}>
        <form
          className={styles.LoginForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className={styles.LoginTitle}>Register Account</h1>
          <input
            className={styles.LoginEmailInput}
            placeholder="First Name"
            type="text"
            {...register("firstName", {
              required: "Please enter your first name",
            })}
            id="firstName"
            autoFocus
          ></input>
          {errors.firstName && (
            <div className={styles.LoginEmailInputErrorMessage}>
              <p>{errors.firstName.message}</p>
            </div>
          )}
          <input
            className={styles.LoginEmailInput}
            placeholder="Last Name"
            type="text"
            {...register("lastName", {
              required: "Please enter your last name",
            })}
            id="lastName"
          ></input>
          {errors.lastName && (
            <div className={styles.LoginEmailInputErrorMessage}>
              <p>{errors.lastName.message}</p>
            </div>
          )}
          <input
            className={styles.LoginEmailInput}
            placeholder="Address"
            type="text"
            {...register("address", {
              required: "Please enter your address",
            })}
            id="address"
          ></input>
          {errors.address && (
            <div className={styles.LoginEmailInputErrorMessage}>
              <p>{errors.address.message}</p>
            </div>
          )}
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
          <input
            className={styles.LoginPasswordInput}
            placeholder="Confirm password"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 5,
                message: "Password must be longer that 5 characters",
              },
            })}
            id="confirmPassword"
          ></input>
          {errors.confirmPassword && (
            <div className={styles.LoginPasswordInputErrorMessage}>
              <p>{errors.confirmPassword.message}</p>
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className={styles.LoginPasswordInputErrorMessage}>
                <p>Password do not match</p>
              </div>
            )}
          <button className={styles.LoginButton}>Register</button>
          <div className={styles.LoginRedirectToRegisterContainer}>
            <p>Already have an account?</p> <br></br>
            <p>
              Click{" "}
              <Link
                className={styles.LoginLinkToRegister}
                href={`/login?redirect=${redirect || "/"}`}
              >
                here
              </Link>{" "}
              to login.
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
