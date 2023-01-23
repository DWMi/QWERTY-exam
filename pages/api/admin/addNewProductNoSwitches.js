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
  console.log(updateProd);
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
