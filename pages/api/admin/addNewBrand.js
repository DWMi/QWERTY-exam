import { Prosto_One } from "@next/font/google";
import { nanoid } from "nanoid";
import Category from "../../../models/Category";
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
  const { name, category, img } = req.body;
  const filter = { name: category };
  const update = {
    brands: [
      {
        brandName: name,
        img: img,
        _id: nanoid(),
      },
    ],
  };
  await db.connect();
  const updateProd = await Category.findOneAndUpdate(filter, { $push: update });
  updateProd.save();
  db.disconnect();
  console.log(req.body);
  res.json(req.body);

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
