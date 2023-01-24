import useSWR from "swr";
import s from "../../styles/ProductPage.module.css";
import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function successPage() {
  const router = useRouter();

  const sessionId = router.query.sessionId;
  const URL = sessionId ? `/api/stripe/${sessionId}` : null;
  const { data, error } = useSWR(URL, fetcher);

  console.log(data?.order);
  
  if (data?.order == undefined) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{ height: "100vh" }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  const { emptyCart } = useCart();

  emptyCart();

  return (
    <>
      <div className={s.centerContainer}>
        <h1> Thanks for your order, {data?.order.customer_details.name} </h1>
        <TableContainer component={Paper} style={{ width: "800px" }}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            style={{ width: "800px" }}
          >
            <TableHead style={{ height: "120px" }}>
              <TableRow>
                <TableCell style={{ fontSize: "20px" }}>
                  Order: {data?.order.orderNumber}
                </TableCell>
                <TableCell style={{ fontSize: "20px" }}></TableCell>
                <TableCell style={{ fontSize: "20px" }}></TableCell>
                <TableCell align="right" style={{ fontSize: "20px" }}>
                  Date: {data?.order.date}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>Product</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>Unit Price</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>Qty</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>Total SEK</h3>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.order.orderItems.map((item) => {
                return (
                  <TableRow>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell align="right">{item.unit_price}:-</TableCell>
                    <TableCell align="right">{item.qty}</TableCell>
                    <TableCell align="right">{item.amount_total}:-</TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell style={{ fontSize: "20px" }}>
                  Sub total: {data?.order.totalPrice} SEK
                </TableCell>
              </TableRow>

              <TableRow
                style={{
                  fontSize: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TableCell style={{ display: "flex", flexDirection: "column" }}>
                  <h3>Ship to:</h3>
                  <p>{data?.order.customer_details.name}</p>

                  <p>{data?.order.shipping_details?.line1}</p>
                  <p>
                    {data?.order.shipping_details?.city}{" "}
                    {data?.order.shipping_details?.postal_code},{" "}
                    {data?.order.shipping_details?.country}{" "}
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
