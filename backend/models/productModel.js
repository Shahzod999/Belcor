import mongoose from "mongoose";

const basketItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  availabilityStatus: {
    type: String,
    enum: ["In Stock", "Out of Stock", "Pre-order"],
    required: true,
  },
});

const userInfoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const orderStateSchema = new mongoose.Schema({
  delivered: { type: Boolean, default: true, required: true },
  shipped: { type: Boolean, default: false, required: true },
  received: { type: Boolean, default: false, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    basket: {
      type: [basketItemSchema],
      required: true,
    },
    totalprice: {
      type: Number,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    userInfo: {
      type: userInfoSchema,
      required: true,
    },
    orderStatus: {
      type: orderStateSchema,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
