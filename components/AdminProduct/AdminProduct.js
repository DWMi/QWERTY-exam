import styles from "./AdminProduct.module.css";
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

const AdminProduct = (props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [main, setMain] = React.useState("");

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [qty, setQty] = React.useState("");
  const [category, setCategory] = React.useState("");

  useEffect(() => {
    //hello
    router.push("/admin/products");
    setName("");
    setPrice("");
    setQty("");
    setCategory("");
    setMain("");
  }, []);

  const { handleSubmit, register, getValues } = useForm();
  const submitHandler = async ({
    _id,
    name,
    pictures,
    price,
    qty,
    category,
  }) => {
    try {
      const response = await axios.post("/api/admin/editProduct", {
        _id: props.product._id,
        name: name || props.product.name,
        pictures,
        price: price || props.product.price,
        qty: qty || props.product.qty,
        category: category || props.product.category,
      });
      setName("");
      setPrice("");
      setQty("");
      setCategory("");
      setMain("");
      props.setOpen(false);
      router.push("/admin/products");
      console.log(response);
    } catch (err) {
      console.log(getError(err));
    }
  };
  const { data, error } = useSWR("/api/categories/get-all-categories", fetcher);
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      style={{
        backgroundColor: "white 0.5",
      }}
    >
      <Box sx={{ ...style, width: "80%", height: "90%", overflowY: "auto" }}>
        <h1 style={{ margin: "30px" }}>Edit Product</h1>
        <br></br>
        <form
          className={styles.LoginForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={styles.AdminProductRowSingleElement}>
            <h3>ID: {props.product._id}</h3>
          </div>
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
              placeholder={props.product.name}
              type="text"
              id="name"
              autoFocus
            ></input>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            {" "}
            <h3 style={{ textAlign: "center" }}>Pictures:</h3>
            {props.product.category === "Keyboards" ||
            props.product.brand === "Cables" ? (
              <>
                <Image
                  style={{ objectFit: "contain" }}
                  src={props.product.img1}
                  width={"100"}
                  height={"100"}
                  alt={props.product.name}
                />
                <Image
                  style={{ objectFit: "contain" }}
                  src={props.product.img2}
                  width={"100"}
                  height={"100"}
                  alt={props.product.name}
                />
              </>
            ) : (
              <Image
                style={{ objectFit: "contain" }}
                src={props.product.img1}
                width={"100"}
                height={"100"}
                alt={props.product.name}
              />
            )}
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            {" "}
            <h3>Price:</h3>
            <input
              value={price}
              {...register("price", {
                required: false,
              })}
              onChange={(event) => {
                setMain(event.target.value);
                setPrice(event.target.value);
              }}
              className={styles.LoginEmailInput}
              placeholder={props.product.price}
              type="number"
              id="price"
              autoFocus
            ></input>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            {" "}
            <h3>Quantity:</h3>
            <input
              {...register("qty", {
                required: false,
              })}
              value={qty}
              onChange={(event) => {
                setMain(event.target.value);
                setQty(event.target.value);
              }}
              className={styles.LoginEmailInput}
              placeholder={props.product.qty}
              type="number"
              id="qty"
              autoFocus
            ></input>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            {" "}
            <h3 for="category">Choose a category:</h3>
            <input
              {...register("category", {
                required: false,
              })}
              value={category}
              onChange={(event) => {
                setMain(event.target.value);
                setCategory(event.target.value);
              }}
              className={styles.LoginEmailInput}
              placeholder={props.product.category}
              type="text"
              id="category"
              autoFocus
            ></input>
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

export default AdminProduct;
