import mongoose from "mongoose";

const ProductsSchema = mongoose.Schema(
  {
    sku: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    brand: {
      type: String,
      required: false,
    },
    img1: String,
    img2: String,
    price: Number,
    qty: Number,
    category: String,
    switches: Array,
  },

  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductsSchema);

export default Product;
