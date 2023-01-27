import { Prosto_One } from "@next/font/google";
import User from "../../../models/User";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { _id, firstName, lastName, email, address, isAdmin } = req.body;
  const filter = { _id: _id };
  const update = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    address: address,
    isAdmin: isAdmin,
  };
  await db.connect();
  const updateUser = await User.findOneAndUpdate(filter, update, {
    returnOriginal: false,
  });
  await updateUser.save();
  await db.disconnect();

  res.send(updateUser);
}

export default handler;
