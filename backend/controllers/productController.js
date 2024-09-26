import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/productModel.js";

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({});
    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.status(404).json({ message: "Zero orders. Don't be upset :) We can do it!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Status Error" });
  }
});

const fetchAllProductsForUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ "userInfo._id": userId });
    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.status(404).json({ message: "Zero orders. Don't be upset :) We can do it!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Status Error" });
  }
});

const addProductToOrder = asyncHandler(async (req, res) => {
  try {
    const product = new Order({ ...req.body });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const updateStatusOrder = asyncHandler(async(req, res) =>{
  const { _id, orderStatus } = req.body;

  const product = await Order.findById(_id);

  if (!product) {
    return res.status(404).json({ message: 'Order not found' }); // Обработка ошибки, если заказ не найден
  }
  product.orderStatus = {
    ...product.orderStatus,
    ...orderStatus,
  };

  const updatedProduct = await product.save();
  res.json(updatedProduct);
})

export { fetchAllProducts, addProductToOrder, fetchAllProductsForUser, updateStatusOrder };
