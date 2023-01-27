import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styles from "./DeleteProduct.module.css";
import Link from "next/link";
import { getError } from "../../utils/error";
import axios from "axios";

const DeleteProduct = (props) => {
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
  const submitHandler = async ({ _id }) => {
    try {
      const response = await axios.post("/api/admin/deleteProduct", {
        _id: props.product._id,
      });
      setName("");
      setPrice("");
      setQty("");
      setCategory("");
      setMain("");
      props.setOpenDelete(false);
      router.push("/admin/products");
    } catch (err) {
      console.log(getError(err));
    }
  };

  const style = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
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

  return (
    <Modal
      open={props.openDelete}
      onClose={props.handleClose}
      style={{
        backgroundColor: "white 0.5",
      }}
    >
      <Box sx={{ ...style, width: "50%", height: "20%" }}>
        <h1>Are you sure you want to delete this product?</h1>
        <button
          onClick={handleSubmit(submitHandler)}
          className={styles.AdminButtonYes}
          type="submit"
        >
          Yes, delete
        </button>
        <div onClick={props.handleClose} className={styles.AdminButtonNo}>
          No, go back
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteProduct;
