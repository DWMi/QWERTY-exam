import { Prosto_One } from "@next/font/google";
import User from "../../../models/User";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { _id } = req.body;
  const filter = { _id: _id };
  await db.connect();
  const deleteUser = await User.findOneAndDelete(filter);
  db.disconnect();
  res.json(deleteUser);
}

export default handler;
