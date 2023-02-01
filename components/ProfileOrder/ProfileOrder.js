import styles from "./ProfileOrder.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { getError } from "../../utils/error";
import axios from "axios";
import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { nanoid } from "nanoid";

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

const ProfileOrder = (props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [main, setMain] = React.useState("");

  const [isSent, setIsSent] = React.useState("");

  useEffect(() => {
    router.push("/profile");
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
      <Box
        className={styles.box}
        sx={{
          ...style,
          width: "70%",
          height: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <form
          className={styles.LoginForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={styles.AdminProductRowSingleElement}>
            <h3>Order Number:</h3>
            <br />
            <h3>{props.order.orderNumber}</h3>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            <h3>Order Date:</h3>
            <br />
            <h3>{props.order.date}</h3>
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
            <h3>Items:</h3>
            <br />
            <div>
              {props.order.orderItems &&
                props.order.orderItems.map((items) => {
                  console.log(items);
                  return (
                    <Link
                      key={nanoid()}
                      className={styles.linkToProduct}
                      href={`/product/${items.product_name}`}
                    >
                      {items.qty > 1 ? (
                        <h3 className={styles.textOne}>
                          {items.qty}x {items.product_name}, {items.unit_price}{" "}
                          SEK
                        </h3>
                      ) : (
                        <h3 className={styles.textOne}>
                          {items.product_name}, {items.unit_price} SEK
                        </h3>
                      )}
                      <h3 className={styles.textTwo}>Go to product</h3>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            <h3>Delivery option:</h3>
            <br />
            <h3>
              {props.order.delivery_options?.name},{" "}
              {props.order.delivery_options?.price} SEK
            </h3>
          </div>
          <div className={styles.AdminProductRowSingleElement}>
            <h3>Shipped:</h3>
            <br />
            {props.order.isSent ? <h3>Yes</h3> : <h3>No</h3>}
          </div>

          <div className={styles.AdminProductRowSingleElement}>
            {" "}
            <h3>Total Price:</h3>
            <br />
            <h3>{props.order.totalPrice},00 SEK</h3>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ProfileOrder;
