import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout.js";
import Link from "next/link";
import styles from "../../styles/Admin.module.css";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { getError } from "../../utils/error.js";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session?.user);
  console.log(router);
  useEffect(() => {
    if (!session?.user.isAdmin) {
      router.push("/");
      //make unauthorized page later
    }
  }, []);
  return (
    <div className={styles.AdminDashboardContainer}>
      <br />
      <h1 style={{ fontSize: "30px" }}>ADMIN PAGE</h1>
      <br></br>
      <div className={styles.AdminDashboardBackToSiteContainer}></div>
      <div className={styles.AdminDashboardCategoriesContainer}>
        <Link style={{ width: "100%" }} href={"/admin/orders"}>
          <button style={{ width: "100%" }} className={styles.AdminButton}>
            <h1 style={{ fontSize: "20px" }}>Orders</h1>
          </button>
        </Link>
        <Link style={{ width: "100%" }} href={"/admin/products"}>
          <button style={{ width: "100%" }} className={styles.AdminButton}>
            <h1 style={{ fontSize: "20px" }}>Products</h1>
          </button>
        </Link>
        <Link style={{ width: "100%" }} href={"/admin/users"}>
          <button style={{ width: "100%" }} className={styles.AdminButton}>
            <h1 style={{ fontSize: "20px" }}>Users</h1>
          </button>
        </Link>
      </div>
      <Link className={styles.BackToSite} href={"/"}>
        <h1 style={{ fontSize: "20px" }}>Back to the website</h1>
      </Link>
    </div>
  );
}
