import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const frtchAllProducts = asyncHandler(async (req, res) => {
  console.log("fetched");
});

export { frtchAllProducts };
