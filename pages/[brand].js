import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import db from "../utils/db";
import { useEffect } from "react";
import Product from "../models/Product";
import Image from "next/image";
import s from "../styles/Category.module.css";
import BANNER from "../public/brandPic/landingBanner.png";
import ProductCard from "../components/ProductCard/ProductCard";

export default function BrandsPage({ products }) {
  const router = useRouter();

  useEffect(() => {
    if (products.length == 0) {
      router.back();
    }
  }, []);

  return (
    <>
      <Head>
        <title>QWERTY - {router.query.brand}</title>
        <meta name="description" content="QWERTY - Your one-stop shop for custom built mechanical keyboards, accessories, and more. We specialize in Keychron, Ducky, Yunzii, Varmilo and other mechanical keyboard brands."/>
        <meta name="keywords" content="mechanical keyboard, custom keyboard, Keychron, Ducky, Yunzii, Varmilo, keyboard accessories"/>
        <meta name="robots" content="index, follow"/>
        <meta name="author" content="QWERTY"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={s.centerContainer}>
        <div className={s.bannerContainer}>
          <Image alt={'qwerty banner'} src={BANNER} style={{ height: "100%", objectFit: "cover" }} />
          <div className={s.bannerText}>
            <h1 className={s.headerText}>{router.query.brand}</h1>
          </div>
        </div>

        <div className={s.container}>
          {products &&
            products.map((prod) => {
              return <ProductCard prod={prod} />;
            })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const brandName = context.query.brand;

  await db.connect();
  const products = await Product.find({ brand: brandName }).lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
