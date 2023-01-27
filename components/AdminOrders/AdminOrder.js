import styles from "./AdminOrder.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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

const AdminOrder = (props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [main, setMain] = React.useState("");

  const [isSent, setIsSent] = React.useState("");

  useEffect(() => {
    //hello
    router.push("/admin/orders");
    setIsSent("");
    setMain("");
  }, []);

  const { handleSubmit, register, getValues } = useForm();
  const submitHandler = async ({ _id, isSent }) => {
    try {
      const response = await axios.post("/api/admin/editOrder", {
        _id: props.order._id,
        isSent: isSent || props.order.isSent,
      });
      setIsSent("");
      setMain("");
      props.setOpen(false);
      router.push("/admin/orders");
    } catch (err) {
      console.log(getError(err));
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
      <Box sx={{ ...style, width: "70%", height: "70%" }}>
        <h1 style={{ margin: "30px" }}>Edit Order</h1>
        <br></br>
        <form
          className={styles.LoginForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={styles.AdminProductRowSingleElement}>
            <h3>Order Number: {props.order.orderNumber}</h3>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            <h3>Order Date: {props.order.date}</h3>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            <h3>Shipping Details:</h3>
            <br />
            <h3>
              {props.order.shipping_details?.line1},{" "}
              {props.order.shipping_details?.postal_code},{" "}
              {props.order.shipping_details?.city},{" "}
              {props.order.shipping_details?.country}
            </h3>
          </div>

          <div className={styles.AdminProductRowSingleElement}>
            {" "}
            <h3>Total Price: {props.order.totalPrice},00 SEK</h3>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            {" "}
            <h3 for="category">Is sent:</h3>
            <select
              {...register("isSent", {
                required: false,
              })}
              value={isSent}
              onChange={(event) => {
                setMain(event.target.value);
                {
                  event.target.value === "true"
                    ? setIsSent(true)
                    : setIsSent(false);
                }
              }}
              className={styles.LoginEmailInput}
              placeholder={props.order.isSent}
              type="text"
              id="isSent"
              autoFocus
            >
              <option value="">Select</option>
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

export default AdminOrder;
