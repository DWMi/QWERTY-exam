import Product from "../../models/Product";
import db from "../../utils/db";
import s from "../../styles/ProductPage.module.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { nanoid } from "nanoid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";


export default function SingleProduct({ product }) {
  const [loading, setLoading] = useState(false);
  const [selectedSwitch, setSelectedSwitch] = useState("");
  const [imgSrc1, setImgSrc1] = useState(product.img1);
  const [imgSrc2, setImgSrc2] = useState(product.img2);
  useEffect(() => {
    if (product.category === "Keyboards") {
      setSelectedSwitch("mx red");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, [loading]);

  const { addItem } = useCart();
  const { items } = useCart();
  const { updateItemQuantity } = useCart();
  console.log(items);

  const addToCart = () => {
    const foundProduct = items.find(
      (item) => item.selectedSwitch == selectedSwitch && item._id == product._id
    );

    if (foundProduct) {
      updateItemQuantity(foundProduct.id, foundProduct.quantity + 1);
    } else {
      const productToAdd = { ...product, id: nanoid(), selectedSwitch };
      addItem(productToAdd, 1);
    }
  };

  const handleChange = (event) => {
    setSelectedSwitch(event.target.value);
  };

  return (
    <div className={s.centerContainer}>
      <div className={s.container}>
        <div className={s.imgMainContainer}>
        
          <Image
            src={imgSrc1}
            width={1000}
            height={1000}
            style={{ objectFit: "contain", width: "100%", height: "70%" }}
          />

          {product.img2 ? (
            <Image
              src={imgSrc2}
              width={1000}
              height={1000}
              style={{ objectFit: "contain", height: "29%",cursor:'pointer' }}
              onClick={() => {
                if (imgSrc1 === product.img1 &&imgSrc2 === product.img2 ) {
                  setImgSrc1(product.img2);
                  setImgSrc2(product.img1);
                } else {
                  setImgSrc1(product.img1);
                  setImgSrc2(product.img2);
                }
              }}
            />
          ) : null}
        </div>
        <div className={s.productInfoDiv}>
          <h3 style={{ fontSize: "50px", margin: "0" }}>{product.name}</h3>
          <h4 style={{ fontSize: "30px", margin: "0" }}>{product.price} SEK</h4>
          <div className={s.productSelectDiv}>
            {product.switches.length ? (
              <FormControl required sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel value="HEJ" id="demo-simple-select-label">
                  Switch
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={selectedSwitch}
                  label="selectedSwitch"
                  onChange={handleChange}
                  style={{ textTransform: "uppercase" }}
                  inputProps={{MenuProps: {disableScrollLock: true}}}
                >
                  {product &&
                    product.switches.map((keySwitch) => {
                      return (
                        <MenuItem
                          value={keySwitch}
                          style={{ paddingRight:'0', textTransform: "uppercase" }}
                        >
                          {keySwitch}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            ) : null}

            {loading ? (
              <button
                className={s.ProductPageButton}
                onClick={() => {
                  addToCart();
                  setLoading(true);
                }}
              >
                <CircularProgress style={{ width: "30px" }} color="inherit" />
              </button>
            ) : (
              <button
                onClick={() => {
                  addToCart();
                  setLoading(true);
                }}
                className={s.ProductPageButton}
              >
                ADD TO CART
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const productName = context.query.slug;

  await db.connect();
  const product = await Product.findOne({ name: productName }).lean();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
