import React, { useEffect } from "react";
import styles from "../../styles/Admin.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import User from "../../models/User";
import db from "../../utils/db";
import { BsFillGearFill, BsFillTrashFill } from "react-icons/bs";
import AdminRow from "../../components/AdminRowUsers/AdminRow.js";
import AdminUser from "../../components/AdminUser/AdminUser";

export async function getServerSideProps(context) {
  const categoryName = context.query.categoryName;
  await db.connect();
  const users = await User.find().lean();
  return {
    props: {
      users: users.map(db.convertDocToObj),
    },
  };
  db.disconnect();
}

export default function Products({ users }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user.isAdmin) {
      router.push("/");
      //make unauthorized page later
    }
  }, []);

  const [selectedUser, setSelectedUser] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleOpen = (user) => {
    setOpen(true);
    setSelectedUser(user);
  };

  const handleClose = () => {
    router.push("/admin/users");
    setOpen(false);
  };

  const handleOpenDelete = (user) => {
    setOpenDelete(true);
    setSelectedUser(user);
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
        {users &&
          users.map((user) => {
            return (
              <div className={styles.AdminProductRow}>
                <div className={styles.AdminUserRowSingleElement}>
                  <h3 style={{ textTransform: "uppercase" }}>
                    {user._id.slice(-5)}
                  </h3>
                </div>
                <div className={styles.AdminUserRowSingleElement}>
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                </div>
                <div className={styles.AdminUserRowSingleElement}>
                  <h3>{user.email}</h3>
                </div>
                <div className={styles.AdminUserRowSingleElement}>
                  <h3>{user.address}</h3>
                </div>
                <div className={styles.AdminProductRowSingleElementIsAdmin}>
                  {user.isAdmin === false ? (
                    <h3 style={{ color: "red" }}>No</h3>
                  ) : (
                    <h3 style={{ color: "green" }}>Yes</h3>
                  )}
                </div>
                <div className={styles.AdminProductRowSingleElementIcon}>
                  <BsFillGearFill
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpen(user)}
                  ></BsFillGearFill>
                </div>
                <div className={styles.AdminProductRowSingleElementIcon}>
                  <BsFillTrashFill
                    onClick={() => handleOpenDelete(user)}
                    style={{ color: "red", cursor: "pointer" }}
                  ></BsFillTrashFill>
                </div>
              </div>
            );
          })}
      </div>
      <AdminUser
        user={selectedUser}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
      ></AdminUser>
    </>
  );
}
