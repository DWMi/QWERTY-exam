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
  const [brand, setBrand] = React.useState("");
  const [imageOne, setImageOne] = React.useState("");
  const [imageTwo, setImageTwo] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [qty, setQty] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");

  useEffect(() => {
    router.push("/admin/products");
    setName("");
    setBrand("");
    setPrice("");
    setQty("");
    setCategory("");
    setMain("");
    setDescription("");
  }, []);

  const { handleSubmit, register, getValues } = useForm();
  const submitHandler = async ({
    _id,
    name,
    brand,
    img1,
    img2,
    price,
    qty,
    category,
  }) => {
    try {
      setCategory(props.product.category);
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
        const response = await axios.post("/api/admin/editProduct", {
          _id: props.product._id,
          name: name || props.product.name,
          brand: brand || props.product.brand,
          description: description || props.product.description,
          img1: imageResponseOne.secure_url || props.product.img1,
          img2: image2slug || props.product.img2,
          price: price || props.product.price,
          qty: qty || props.product.qty,
          category: category || props.product.category,
        });
      } else {
        const response = await axios.post("/api/admin/editProductNoSwitches", {
          _id: props.product._id,
          name: name || props.product.name,
          brand: brand || props.product.brand,
          description: description || props.product.description,
          img1: imageResponseOne.secure_url || props.product.img1,
          img2: image2slug || props.product.img2,
          price: price || props.product.price,
          qty: qty || props.product.qty,
          category: category || props.product.category,
        });
      }
      console.log(imageResponseOne.secure_url);
      console.log(image2slug);

      setName("");
      setBrand("");
      setPrice("");
      setQty("");
      setCategory("");
      setMain("");
      setDescription("");
      props.setOpen(false);
      router.push("/admin/products");
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
            <h3>Description:</h3>
            <textarea
              {...register("description", {
                required: false,
              })}
              value={description}
              onChange={(event) => {
                setMain(event.target.value);
                setDescription(event.target.value);
              }}
              className={styles.LoginEmailInput}
              placeholder={props.product?.description}
              type="text"
              id="description"
              autoFocus
            ></textarea>
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

                <Image
                  style={{ objectFit: "contain" }}
                  src={props.product.img2}
                  width={"100"}
                  height={"100"}
                  alt={props.product.name}
                />
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
              </>
            ) : (
              <>
                <Image
                  style={{ objectFit: "contain" }}
                  src={props.product.img1}
                  width={"100"}
                  height={"100"}
                  alt={props.product.name}
                />
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
              </>
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
