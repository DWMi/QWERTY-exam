import styles from "./AdminUser.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Image from "next/image";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { getError } from "../../utils/error";
import axios from "axios";
import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 400,
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: "10px 10px black",
  pt: 2,
  px: 4,
  pb: 3,
};

const AdminUser = (props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [main, setMain] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState();

  useEffect(() => {
    //hello
    router.push("/admin/users");
    setFirstName("");
    setLastName("");
    setEmail("");
    setAddress("");
    setIsAdmin("");
    setMain("");
  }, []);

  const { handleSubmit, register, getValues } = useForm();
  const submitHandler = async ({
    _id,
    firstName,
    lastName,
    email,
    address,
    isAdmin,
  }) => {
    try {
      props.setOpen(false);
      const response = await axios.post("/api/admin/editUser", {
        _id: props.user._id,
        firstName: firstName || props.user.firstName,
        lastName: lastName || props.user.lastName,
        email: email || props.user.email,
        address: address || props.user.address,
        isAdmin: isAdmin || props.user.isAdmin,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setAddress("");
      setIsAdmin("");
      setMain("");
      router.push("/admin/users");
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      style={{
        backgroundColor: "white 0.5",
      }}
    >
      <Box sx={{ ...style, width: "80%", height: "80%" }}>
        <h1 style={{ margin: "30px" }}>Edit User</h1>
        <br></br>
        <form
          className={styles.LoginForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={styles.AdminProductRowSingleElement}>
            <h3>ID: {props.user._id}</h3>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            <h3>First Name:</h3>
            <input
              {...register("firstName", {
                required: false,
              })}
              value={firstName}
              onChange={(event) => {
                setMain(event.target.value);
                setFirstName(event.target.value);
              }}
              className={styles.LoginEmailInput}
              placeholder={props.user.firstName}
              type="text"
              id="firstName"
              autoFocus
            ></input>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            <h3>Last Name:</h3>
            <input
              {...register("lastName", {
                required: false,
              })}
              value={lastName}
              onChange={(event) => {
                setMain(event.target.value);
                setLastName(event.target.value);
              }}
              className={styles.LoginEmailInput}
              placeholder={props.user.lastName}
              type="text"
              id="lastName"
              autoFocus
            ></input>
          </div>

          <div className={styles.AdminProductRowSingleElement}>
            {" "}
            <h3>Email:</h3>
            <input
              value={email}
              {...register("email", {
                required: false,
              })}
              onChange={(event) => {
                setMain(event.target.value);
                setEmail(event.target.value);
              }}
              className={styles.LoginEmailInput}
              placeholder={props.user.email}
              type="number"
              id="email"
              autoFocus
            ></input>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            {" "}
            <h3>Address:</h3>
            <input
              {...register("address", {
                required: false,
              })}
              value={address}
              onChange={(event) => {
                setMain(event.target.value);
                setAddress(event.target.value);
              }}
              className={styles.LoginEmailInput}
              placeholder={props.user.address}
              type="text"
              id="address"
              autoFocus
            ></input>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            {" "}
            <h3 for="category">Is admin:</h3>
            <select
              {...register("isAdmin", {
                required: false,
              })}
              value={isAdmin}
              onChange={(event) => {
                setMain(event.target.value);
                console.log(event.target.value);
                {
                  event.target.value === "true"
                    ? setIsAdmin(true)
                    : setIsAdmin(false);
                }
              }}
              className={styles.LoginEmailInput}
              placeholder={props.user.isAdmin}
              type="text"
              id="isAdmin"
              autoFocus
            >
              <option value="" selected disabled hidden>
                Select here
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          {main.length === 0 ? (
            <button
              className={styles.AdminButtonDisabled}
              disabled
              type="submit"
            >
              Save changes
            </button>
          ) : (
            <button className={styles.AdminButton} type="submit">
              Save changes
            </button>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default AdminUser;
