import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout.js";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../utils/error.js";
import { useRouter } from "next/router.js";
import Head from "next/head";
import { useToast, Box, ChakraProvider } from "@chakra-ui/react";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast({
          title: "Invalid credentials",
          description: "Please check your email or password!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err) {
      console.log(getError(err));
    }
  };
  return (
    <>
      <Head>
        <title>QWERTY - Login</title>
        <meta
          name="description"
          content="QWERTY - Your one-stop shop for custom built mechanical keyboards, accessories, and more. We specialize in Keychron, Ducky, Yunzii, Varmilo and other mechanical keyboard brands."
        />
        <meta
          name="keywords"
          content="mechanical keyboard, custom keyboard, Keychron, Ducky, Yunzii, Varmilo, keyboard accessories"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="QWERTY" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <div className={styles.LoginFormContainer}>
          <form
            className={styles.LoginForm}
            onSubmit={handleSubmit(submitHandler)}
          >
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
      </ChakraProvider>
    </>
  );
}
