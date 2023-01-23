import { Prosto_One } from "@next/font/google";
import Order from "../../../models/Order";
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
  const { _id, isSent } = req.body;
  const filter = { _id: _id };
  const update = {
    isSent: isSent,
  };
  await db.connect();
  const updateOrder = await Order.findOneAndUpdate(filter, update, {
    returnOriginal: false,
  });
  await updateOrder.save();
  await db.disconnect()
  console.log(updateOrder);

  res.send(updateOrder);

  /*  return res.status(200)({
    message: "User saved",
    _id: updateUser._id,
    name: updateUser.name,
    pictures: updateUser.pictures,
    price: updateUser.price,
    qty: updateUser.qty,
    category: updateProd.category,
  }); */
}

export default handler;
