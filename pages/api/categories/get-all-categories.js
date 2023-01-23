// Next.js API route support: https://nextjs.org/docs/api-routes/
import db from '../../../utils/db'
import Category from "../../../models/Category";


export default async function handler(req, res) {
  await db.connect();
  const categories = await Category.find()
  await db.disconnect();

  res.status(200).json(categories)
}
