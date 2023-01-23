import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: String,
    date: String,
    orderId: String,
    userId: String,
    orderItems: [],

    totalPrice: { type: Number, required: false },
    isSent: { type: Boolean, required: false },
    shipping_details: { type: Object, required: false },
    delivery_options: { type: Object, required: false },
    customer_details: { type: Object, required: false },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
