import { Prosto_One } from "@next/font/google";
import Order from "../../../models/Order";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

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

  res.send(updateOrder);


}

export default handler;
