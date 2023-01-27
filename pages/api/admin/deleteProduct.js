import { Prosto_One } from "@next/font/google";
import Product from "../../../models/Product";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
 
  const { _id } = req.body;
  const filter = { _id: _id };
  await db.connect();
  const deleteProd = await Product.findOneAndDelete(filter);
  db.disconnect();
  res.json(deleteProd);



}

export default handler;
