import Product from "../../../models/Product";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { _id, name, brand, img1, img2, price, qty, category } = req.body;

  const newProd = {
    name: name,
    brand: brand,
    price: price,
    img1: img1,
    img2: img2,
    qty: qty,
    category: category,
  };
  await db.connect();
  const updateProd = await Product.create(newProd);
  db.disconnect();
  res.json(req.body);

}

export default handler;
