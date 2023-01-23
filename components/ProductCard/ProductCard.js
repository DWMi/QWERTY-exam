import s from "../ProductCard/ProductCard.module.css";
import Image from "next/image";
import Link from "next/link";

const ProductCard = (props) => {
  const prod = props.prod;
  return (
    <div className={s.productCard}>
      <Link className={s.productCardCont} href={`/product/${prod.name}`}>
        <div style={{ width: "200px", height: "200px", display: "flex" }}>
          <Image
            style={{ objectFit: "contain", width: "100%" }}
            src={prod.img1}
            width={"256"}
            height={"205"}
            alt={prod.name}
          />
        </div>
        <h3>{prod.name}</h3>
        <h2>{prod.price},00 SEK</h2>
      </Link>
    </div>
  );
};

export default ProductCard;
