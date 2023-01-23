import User from "../../../models/User";
import db from "../../../utils/db";
import bcryptjs from "bcryptjs";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { email, firstName, lastName, address, password } = req.body;
  if (
    !email ||
    !email.includes("@") ||
    !firstName ||
    !lastName ||
    !address ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: "Validation error!",
    });
    return;
  }
  await db.connect();
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "Account already registered!" });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    email,
    firstName,
    lastName,
    address,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();
  db.disconnect();

  res.status(201).send({
    message: "New user registered!",
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin,
    address: user.address
  });
}

export default handler;
