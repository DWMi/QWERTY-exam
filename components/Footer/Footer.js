import LOGO from "../../public/brandPic/QWERTYLOGO2.svg";
import Image from "next/image";
import { ImFacebook, ImTwitter } from "react-icons/im";
import { RiInstagramFill } from "react-icons/ri";
import style from "./Footer.module.css";
import Link from "next/link";
import tc from "../../pages/termsandcondition";

const Footer = () => {
  return (
    <div className={style.footerCon}>
      <div className={style.backToTop}>
        <div
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Back top
        </div>
      </div>
      <div className={style.boxDad}>
        <div className={style.box1Con}>
          <div className={style.box1}>
            <Image src={LOGO} alt="qwerty logo" />
            <div
              style={{
                display: "flex",
                margin: "10px",
                gap: "20px",
                color: "white",
              }}
            >
              <Link href="https://www.facebook.com">
                <ImFacebook href="www.facebook.com" />
              </Link>
              <Link href="https://www.twitter.com">
                <ImTwitter />
              </Link>
              <Link href="https://www.instagram.com">
                <RiInstagramFill />
              </Link>
            </div>
            <p
              style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.514)" }}
            >
              Copyright © 2023 QWERTY | All Rights Reserved.
            </p>
          </div>
        </div>
        <div className={style.box2}>
          <p style={{ fontWeight: "bold", color: "white" }}> Products </p>
          <br></br>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              gap: "8px",
              flexDirection: "column",
              color: "rgba(255, 255, 255, 0.514)",
            }}
          >
            <li>
              <Link href="/Keyboards">Keyboards</Link>
            </li>
            <li>
              <Link href="/Accessories">Accessories</Link>
            </li>
          </ul>
        </div>
        <div className={style.box2}>
          <p style={{ fontWeight: "bold", color: "white" }}> Shipping </p>
          <br></br>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              gap: "8px",
              flexDirection: "column",
              color: "rgba(255, 255, 255, 0.514)",
            }}
          >
            <li>
              <Link href="/faq">FAQs</Link>
            </li>
            <li>
              <Link href="/termsandcondition">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
        <div className={style.box2}>
          <p style={{ fontWeight: "bold", color: "white" }}>
            {" "}
            Contact Information{" "}
          </p>
          <br></br>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              gap: "8px",
              flexDirection: "column",
              color: "white",
            }}
          >
            <li>123 Some Street, 41234, Göteborg, Sweden</li>
            <li>0123456789</li>
            <a href="mailto:info.qwertykeyboards@gmail.com">
              <li>info.qwertykeyboards@gmail.com</li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
