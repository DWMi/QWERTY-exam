import { Prosto_One } from "@next/font/google";
import { nanoid } from "nanoid";
import Category from "../../../models/Category";
import Product from "../../../models/Product";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

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
  await db.disconnect();
  res.json(req.body);
}

export default handler;
