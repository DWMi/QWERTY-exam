import { useCart } from "react-use-cart";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import Table from "@mui/material/Table";
import Backdrop from "@mui/material/Backdrop";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";
import { BsFillTrashFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import s from "../../styles/ProductPage.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { useMediaQuery } from "@mui/material";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function checkoutPage() {
  const { items } = useCart();
  const { updateItemQuantity } = useCart();
  const { removeItem } = useCart();
  const { totalItems } = useCart();
  const { cartTotal } = useCart();

  const { status, data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(null);

  useEffect(() => {
    setCartItems(items);
    setTotalCartItems(totalItems);
  }, [items]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setSpinner(false);
    }, 500);
  }, [loading, spinner]);

  const goToPayment = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("api/stripe/checkout_sessions", {
      cartItems,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  const isTabletOrPhone = useMediaQuery("(max-width:730px)");

  return (
    <>
      <Head>
        <title>QWERTY - Checkout</title>
        <meta name="description" content="QWERTY - Your one-stop shop for custom built mechanical keyboards, accessories, and more. We specialize in Keychron, Ducky, Yunzii, Varmilo and other mechanical keyboard brands."/>
        <meta name="keywords" content="mechanical keyboard, custom keyboard, Keychron, Ducky, Yunzii, Varmilo, keyboard accessories"/>
        <meta name="robots" content="index, follow"/>
        <meta name="author" content="QWERTY"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={s.centerContainer}>
        <h1>Shopping cart</h1>
        {!isTabletOrPhone ? (
          totalCartItems > 0 ? (
            <div className={s.tableContainer}>
              <>
                <TableContainer className={s.tableCon} component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    className={s.tableCon2}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell className={s.imgConCheckoutHead}></TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems &&
                        cartItems.map((item) => (
                          <>
                            <TableRow
                              key={item.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                className={s.imgConCheckout}
                                component="th"
                                scope="row"
                              >
                                <Image
                                alt={item.name}
                                  src={item.img1}
                                  width={100}
                                  height={100}
                                  style={{ objectFit: "contain" }}
                                />
                              </TableCell>
                              <TableCell align="left">
                                {item.name}{" "}
                                {item.selectedSwitch
                                  ? `(${item.selectedSwitch})`
                                  : null}
                              </TableCell>
                              {spinner ? (
                                <TableCell align="right">
                                  <CircularProgress color="inherit" />
                                </TableCell>
                              ) : (
                                <TableCell align="right">
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "10px",
                                      justifyContent: "end",
                                    }}
                                  >
                                    <div
                                      onClick={() => {
                                        updateItemQuantity(
                                          item.id,
                                          item.quantity == 1
                                            ? 1
                                            : item.quantity - 1
                                        );
                                        item.quantity == 1
                                          ? setSpinner(false)
                                          : setSpinner(true);
                                      }}
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        border: "2px solid black",
                                        width: "20px",
                                        height: "20px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <p>-</p>
                                    </div>

                                    <div>{item.quantity}</div>
                                    <div
                                      onClick={() => {
                                        updateItemQuantity(
                                          item.id,
                                          item.quantity + 1
                                        );
                                        setSpinner(true);
                                      }}
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        border: "2px solid black",
                                        width: "20px",
                                        height: "20px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <p>+</p>
                                    </div>
                                  </div>
                                </TableCell>
                              )}

                              <TableCell align="right">
                                {item.itemTotal},00 SEK
                              </TableCell>
                              <TableCell align="right">
                                <BsFillTrashFill
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "16px",
                                  }}
                                  onClick={() => {
                                    setLoading(true);
                                    removeItem(item.id);
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div style={{ fontWeight: "bold", fontSize: "2em" }}>
                  {`Total: 
            ${cartTotal},00 SEK`}
                </div>
                {!session?.user ? (
                  <a href="/login">
                    <button className={s.ProductPageButton}>
                      LOGIN TO CHECKOUT
                    </button>
                  </a>
                ) : (
                  <button onClick={goToPayment} className={s.ProductPageButton}>
                    PROCEED TO CHECKOUT
                  </button>
                )}
              </>
              {loading ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  style={{ height: "100vh" }}
                  open={loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              ) : null}
            </div>
          ) : (
            <h2>Your shopping cart is empty!</h2>
          )
        ) : totalCartItems > 0 ? (
          <>
            {cartItems &&
              cartItems.map((item) => {
                return (
                  <div className={s.orderMQCon}>
                    <span>
                      <div>
                        <Image
                          alt={item.name}
                          src={item.img1}
                          width={100}
                          height={100}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </span>
                    <span className={s.orderCardCon}>
                      <div>
                        <p>{item.price},00 SEK</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "20px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            updateItemQuantity(
                              item.id,
                              item.quantity == 1 ? 1 : item.quantity - 1
                            );
                            item.quantity == 1
                              ? setSpinner(false)
                              : setSpinner(true);
                          }}
                        >
                          <p>-</p>
                        </div>

                        <div>{item.quantity}</div>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            updateItemQuantity(item.id, item.quantity + 1);
                            setSpinner(true);
                          }}
                        >
                          <p>+</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <BsFillTrashFill
                          style={{ cursor: "pointer", fontSize: "16px" }}
                          onClick={() => {
                            setLoading(true);
                            removeItem(item.id);
                          }}
                        />
                      </div>
                    </span>
                  </div>
                );
              })}
            <div style={{ fontWeight: "bold", fontSize: "1.5em" }}>
              {`Total: 
            ${cartTotal},00 SEK`}
            </div>
            {!session?.user ? (
              <a href="/login">
                <button className={s.ProductPageButton}>
                  LOGIN TO CHECKOUT
                </button>
              </a>
            ) : (
              <button onClick={goToPayment} className={s.ProductPageButton}>
                PROCEED TO CHECKOUT
              </button>
            )}
            {loading ? (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                style={{ height: "100vh" }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : null}
          </>
        ) : (
          <h2>Your shopping cart is empty!</h2>
        )}
      </div>
    </>
  );
}
