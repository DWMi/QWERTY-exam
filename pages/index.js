import styles from "../styles/Home.module.css";
import Image from "next/image";
import BANNER from "../public/brandPic/landingBanner.png";
import Link from "next/link";
import promoBanner from "../public/brandPic/promoBanner.png";
import contactUs from "../public/brandPic/contactUs.png";
import Product from "../models/Product";
import Category from "../models/Category";
import db from "../utils/db";
import ProductCard from "../components/ProductCard/ProductCard";
import Head from "next/head";
import CookieConsent from "react-cookie-consent";

const Landing = ({ products, categories }) => {
  return (
    <>
      <Head>
        <title>QWERTY - Home</title>
        <meta name="description" content="QWERTY - Your one-stop shop for custom built mechanical keyboards, accessories, and more. We specialize in Keychron, Ducky, Yunzii, Varmilo and other mechanical keyboard brands."/>
        <meta name="keywords" content="mechanical keyboard, custom keyboard, Keychron, Ducky, Yunzii, Varmilo, keyboard accessories"/>
        <meta name="robots" content="index, follow"/>
        <meta name="author" content="QWERTY"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.bannerCon}>
        <div style={{ height: "100%", height: "40%" }}>
          <div className={styles.infoBoxCon}>
            <div className={styles.infoBox}>
              <h1 style={{ fontWeight: "inherit", color: "white" }}>QWERTY</h1>

              <p
                className={styles.infoBoxText}
                style={{ color: "rgba(255, 255, 255, 0.514)" }}
              >
                Welcome to our keyboard reseller company! We are dedicated to
                providing our customers with a wide selection of top-quality
                keyboard products at competitive prices. Our team is constantly
                scouring the market to find the best deals on the latest and
                greatest keyboard models. We take pride in our customer service
                and strive to make every shopping experience with us a pleasant
                one.
              </p>
            </div>
          </div>
          <Image
            style={{ width: "100%", objectFit: "cover" }}
            src={BANNER}
            alt="QWERTY BANNER"
            priority
          ></Image>
        </div>
      </div>
      <div className={styles.contentCon}>
        <h2
          style={{
            borderBottom: "solid 3px #C4C4C4",
            color: "black",
            fontWeight: "lighter",
          }}
        >
          Brands
        </h2>
        <br />
        <p style={{ color: "#616161" }}>
          Here are the available brands of our Keyboards
        </p>
        <div className={styles.content}>
          <div className={styles.brandsCon}>
            {categories &&
              categories.map((cat) => (
                <>
                  {cat.brands &&
                    cat.brands.map((brand) => {
                      return (
                        <>
                          {brand.img ? (
                            <Link
                              href={`/${brand.brandName}`}
                              className={styles.brandPicCon}
                            >
                              <Image
                                priority
                                eager
                                src={brand.img}
                                className={styles.brandPic}
                                alt="brand name"
                                width={2000}
                                height={2000}
                              />
                              <div className={styles.brandInfoBox}>
                                <h4>{brand.brandName}</h4>
                              </div>
                            </Link>
                          ) : null}
                        </>
                      );
                    })}
                </>
              ))}
          </div>
          <div className={styles.promoBanCon}>
            <div className={styles.promoPicCon}>
              <Image
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={promoBanner}
                alt="promo banner"
              />
            </div>
            <div className={styles.promoInfoCon}>
              <div className={styles.promoInfoBox}>
                <h1 className={styles.bannerTitle}>New Year deal</h1>
                <p className={styles.bannerText}>
                  Limited time offer! Use code: NEWYEAR and get 20% off your
                  entire order! Offer expires March 1st, shop now and save on
                  your favorite products.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bestSeller}>
          <h2
            style={{
              borderBottom: "solid 3px #C4C4C4",
              color: "black",
              fontWeight: "lighter",
            }}
          >
            Our favorite keyboards
          </h2>

          <div className={styles.bestSellerItem}>
            {products.slice(2, 6).map((prod) => {
              return <ProductCard prod={prod} />;
            })}
          </div>
          <div className={styles.contactUsBanCon}>
            <div className={styles.contactUs}>
              <Image
                src={contactUs}
                width={550}
                height={350}
                alt={"Contact us"}
              />
              <div className={styles.contactTextCon}>
                <div className={styles.contactText}>
                  <h1 style={{ color: "black", fontWeight: "lighter" }}>
                    {" "}
                    Need Help?
                  </h1>
                  <p style={{ color: "#616161" }}>
                    Do you need help? Feel free to contact us and we'll help you
                    in anyway.
                  </p>
                  <div className={styles.contactBtnCon}>
                    <a className={styles.contactBtn} href="/contact">
                      <button>CONTACT US</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing;
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const filter = { name: "Keyboards" };
  const categories = await Category.find(filter).lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
      categories: categories.map(db.convertDocToObj),
    },
  };
}
