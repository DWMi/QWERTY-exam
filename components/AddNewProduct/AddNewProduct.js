import styles from "./AddNewProduct.module.css";
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

const AddNewProd = (props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [main, setMain] = React.useState("");

  const [imageOne, setImageOne] = React.useState("");
  const [imageTwo, setImageTwo] = React.useState("");

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [qty, setQty] = React.useState("");
  const [category, setCategory] = React.useState("");

  useEffect(() => {
    router.push("/admin/products");
    setName("");
    setBrand("");
    setPrice("");
    setQty("");
    setCategory("");
    setMain("");
  }, []);

  const { handleSubmit, register, getValues } = useForm();
  const submitHandler = async ({
    _id,
    name,
    brand,
    description,
    img1,
    img2,
    price,
    qty,
    category,
  }) => {
    try {
      const uploadPreset = "qwerty";
      const url = "https://api.cloudinary.com/v1_1/dmz4jw3ob/image/upload";

      const formDataOne = new FormData();
      formDataOne.append("upload_preset", uploadPreset);
      formDataOne.append("file", imageOne);

      const formDataTwo = new FormData();
      formDataTwo.append("upload_preset", uploadPreset);
      formDataTwo.append("file", imageTwo);

      const imageResponseOne = await fetch(url, {
        method: "POST",
        body: formDataOne,
      }).then((r) => r.json());
      let image2slug;
      if (imageTwo) {
        const imageResponseTwo = await fetch(url, {
          method: "POST",
          body: formDataTwo,
        }).then((r) => r.json());
        image2slug = imageResponseTwo.secure_url;
      }
      if (category === "Keyboards") {
        const response = await axios.post("/api/admin/addNewProduct", {
          name: name,
          brand: brand,
          description: description,
          img1: imageResponseOne.secure_url,
          img2: image2slug,
          price: price,
          qty: qty,
          category: category,
        });
      } else {
        const response = await axios.post(
          "/api/admin/addNewProductNoSwitches",
          {
            name: name,
            brand: brand,
            description: description,
            img1: imageResponseOne.secure_url,
            img2: image2slug,
            price: price,
            qty: qty,
            category: category,
          }
        );
      }
      setName("");
      setBrand("");
      setPrice("");
      setQty("");
      setCategory("");
      setMain("");
      props.setOpenAdd(false);
      router.push("/admin/products");
    } catch (err) {
      console.log(getError(err));
    }
  };

  const { data, error } = useSWR("/api/categories/get-all-categories", fetcher);
  return (
    <Modal
      open={props.openAdd}
      onClose={props.handleClose}
      style={{
        backgroundColor: "white 0.5",
      }}
    >
      <Box sx={{ ...style, width: "80%", height: "80%", overflowY: "auto" }}>
        <h1 style={{ margin: "30px" }}>Add new Product</h1>
        <br></br>
        <form
          className={styles.LoginForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={styles.AdminProductRowSingleElement}>
            <h3>ID: Will be auto generated</h3>
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
              type="text"
              id="name"
              placeholder="Add name"
              autoFocus
            ></input>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            <h3>Description:</h3>
            <input
              {...register("description", {
                required: false,
              })}
              value={description}
              onChange={(event) => {
                setMain(event.target.value);
                setDescription(event.target.value);
              }}
              className={styles.LoginEmailInput}
              type="text"
              id="description"
              placeholder="Add description"
              autoFocus
            ></input>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            <h3>Brand:</h3>
            <select
              {...register("brand", {
                required: false,
              })}
              value={brand}
              onChange={(event) => {
                setMain(event.target.value);
                setBrand(event.target.value);
              }}
              className={styles.LoginEmailInput}
              type="text"
              id="brand"
              placeholder="Add brand"
              autoFocus
            >
              <option value="">Select brand</option>;
              {props.category &&
                props.category.map((cat) => {
                  return (
                    cat.brands &&
                    cat.brands.map((brand) => {
                      return (
                        <option key={brand._id} value={brand.brandName}>
                          {brand.brandName}
                        </option>
                      );
                    })
                  );
                })}
            </select>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            {" "}
            <h3 style={{ textAlign: "center" }}>Pictures:</h3>
            <input
              id="img1"
              type="file"
              name="img1"
              accept="image"
              onInput={(e) => {
                setImageOne(e.target.files[0]);
              }}
              {...register("img1", {
                required: false,
              })}
            ></input>
            <input
              id="img2"
              type="file"
              name="img2"
              onInput={(e) => {
                setImageTwo(e.target.files[0]);
              }}
              {...register("img2", {
                required: false,
              })}
            ></input>
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
              placeholder="Add price in SEK"
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
              placeholder="Add quantity"
              type="number"
              id="qty"
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
          {main.length === 0 ? (
            <button
              className={styles.AdminButtonDisabled}
              disabled
              type="submit"
            >
              Save product
            </button>
          ) : (
            <button className={styles.AdminButton} type="submit">
              Save product
            </button>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default AddNewProd;
