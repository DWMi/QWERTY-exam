import styles from "./AddNewBrand.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Image from "next/image";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { getError } from "../../utils/error";
import { Button } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { findDOMNode, ReactDOM } from "react-dom";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
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

const AddNewBrand = (props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [main, setMain] = React.useState("");

  const [image, setImage] = React.useState("");

  const [name, setName] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [qty, setQty] = React.useState("");
  const [category, setCategory] = React.useState("");

  useEffect(() => {
    //hello
    router.push("/admin/products");
    setName("");
    setBrand("");
    setPrice("");
    setQty("");
    setCategory("");
    setMain("");
  }, []);

  const { handleSubmit, register, getValues } = useForm();
  const submitHandler = async ({ name, category, img }) => {
    try {
      const uploadPreset = "qwerty";
      const url = "https://api.cloudinary.com/v1_1/dmz4jw3ob/image/upload";

      const formData = new FormData();
      formData.append("upload_preset", uploadPreset);
      formData.append("file", image);

      const imageResponse = await fetch(url, {
        method: "POST",
        body: formData,
      }).then((r) => r.json());
      const response = await axios.post("/api/admin/addNewBrand", {
        name: name,
        category: category,
        img: imageResponse.secure_url,
      });
      setName("");
      setBrand("");
      setPrice("");
      setQty("");
      setCategory("");
      setMain("");
      props.setOpenBrand(false);
      router.push("/admin/products");
    } catch (err) {
      console.log(getError(err));
    }
  };
  return (
    <Modal
      open={props.openBrand}
      onClose={props.handleClose}
      style={{
        backgroundColor: "white 0.5",
      }}
    >
      <Box sx={{ ...style, width: "80%", height: "80%", overflowY: "auto" }}>
        <h1 style={{ margin: "30px" }}>Add new brand</h1>
        <br></br>
        <form
          className={styles.LoginForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={styles.AdminProductRowSingleElement}>
            <h3>Name:</h3>
            <input
              {...register("name", {
                required: false,
              })}
              value={name}
              onChange={(event) => {
                setMain(event.target.value);
                setName(event.target.value);
              }}
              className={styles.LoginEmailInput}
              type="text"
              id="name"
              placeholder="Add name"
              autoFocus
            ></input>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            {" "}
            <h3 htmlFor="category">Choose a category:</h3>
            <select
              {...register("category", {
                required: false,
              })}
              value={category}
              onChange={(event) => {
                setMain(event.target.value);
                setCategory(event.target.value);
              }}
              className={styles.LoginEmailInput}
              placeholder="Add category"
              type="text"
              id="category"
              autoFocus
            >
              <option value="">Select category</option>
              <option value="Keyboards">Keyboards</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          {category === "Keyboards" ? (
            <div className={styles.AdminProductRowSingleElement}>
              <h3 style={{ textAlign: "center" }}>Add image (optional):</h3>

              <input
                id="img"
                type="file"
                name="img"
                accept="image"
                onInput={(e) => {
                  setImage(e.target.files[0]);
                }}
                {...register("img", {
                  required: false,
                })}
              ></input>
            </div>
          ) : null}
          {main.length === 0 ? (
            <button
              className={styles.AdminButtonDisabled}
              disabled
              type="submit"
            >
              Save brand
            </button>
          ) : (
            <button className={styles.AdminButton} type="submit">
              Save brand
            </button>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default AddNewBrand;
