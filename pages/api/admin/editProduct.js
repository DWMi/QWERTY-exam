import { Prosto_One } from "@next/font/google";
import Product from "../../../models/Product";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { _id, name, description, pictures, price, qty, category } = req.body;
  const filter = { _id: _id };
  const update = {
    name: name,
    description: description,
    pictures: pictures,
    price: price,
    qty: qty,
    category: category,
  };
  await db.connect();
  const updateProd = await Product.findOneAndUpdate(filter, update, {
    returnOriginal: false,
  });
  await updateProd.save();
  await db.disconnect();

  res.send(updateProd);

}

export default handler;
