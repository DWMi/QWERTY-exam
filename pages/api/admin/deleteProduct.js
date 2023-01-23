import { Prosto_One } from "@next/font/google";
import Product from "../../../models/Product";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  /*   if (!name || !pictures || !price || !category || !qty) {
      res.status(422).json({
          message: "There was an error while saving the product!",
        });
        return;
    }  */
  const { _id } = req.body;
  const filter = { _id: _id };
  await db.connect();
  const deleteProd = await Product.findOneAndDelete(filter);
  db.disconnect();
  console.log(deleteProd);
  res.json(deleteProd);

  /*   return res.status(200)({
    message: "Product saved",
    _id: updateProd._id,
    name: updateProd.name,
    pictures: updateProd.pictures,
    price: updateProd.price,
    qty: updateProd.qty,
    category: updateProd.category,
  }); */
}

export default handler;
