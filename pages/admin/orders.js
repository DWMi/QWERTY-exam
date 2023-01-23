import React, { useEffect } from "react";
import styles from "../../styles/Admin.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Order from "../../models/Order";
import db from "../../utils/db";
import { BsFillGearFill, BsFillTrashFill } from "react-icons/bs";
import AdminRow from "../../components/AdminRowOrders/AdminRow.js";
import AdminOrder from "../../components/AdminOrders/AdminOrder";

export async function getServerSideProps(context) {
  const categoryName = context.query.categoryName;
  await db.connect();
  const orders = await Order.find().lean();
  return {
    props: {
      orders: orders.map(db.convertDocToObj),
    },
  };
  db.disconnect();
}

export default function Products({ orders }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user.isAdmin) {
      router.push("/");
      //make unauthorized page later
    }
  }, []);

  const [selectedOrder, setSelectedOrder] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = (order) => {
    setOpen(true);
    setSelectedOrder(order);
  };

  const handleClose = () => {
    router.push("/admin/orders");
    setOpen(false);
  };

  return (
    <>
      <div className={styles.AdminDashboardContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "80%",
            gap: "20px",
          }}
        ></div>
        <AdminRow></AdminRow>
        {orders &&
          orders.map((order) => {
            return (
              <div className={styles.AdminProductRow}>
                <div className={styles.AdminUserRowSingleElement}>
                  <h3 style={{ textTransform: "uppercase" }}>
                    {order.orderNumber}
                  </h3>
                </div>
                <div className={styles.AdminUserRowSingleElement}>
                  <h3>{order.date}</h3>
                </div>
                <div className={styles.AdminUserRowSingleElement}>
                  <h3>{order.customer_details.name}</h3>
                </div>
                <div className={styles.AdminProductRowSingleElement}>
                  {order.isSent === false ? (
                    <h3 style={{ color: "red" }}>No</h3>
                  ) : (
                    <h3 style={{ color: "green" }}>Yes</h3>
                  )}
                </div>
                <div className={styles.AdminProductRowSingleElementIcon}>
                  <BsFillGearFill
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpen(order)}
                  ></BsFillGearFill>
                </div>
              </div>
            );
          })}
      </div>
      <AdminOrder
        order={selectedOrder}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
      ></AdminOrder>
    </>
  );
}
