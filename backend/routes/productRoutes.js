import express from "express";
import { fetchAllProducts, addProductToOrder, fetchAllProductsForUser, updateStatusOrder } from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/onlyAdmin").get(authenticate, authorizeAdmin, fetchAllProducts);
router.route("/updateOrder").put(authenticate, authorizeAdmin, updateStatusOrder)
router.route("/").get(authenticate, fetchAllProductsForUser);
router.route("/sendOrder").put(authenticate, addProductToOrder);

export default router;
