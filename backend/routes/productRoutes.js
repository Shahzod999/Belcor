import express from "express";
import formidable from "express-formidable";
import { fetchAllProducts, addProductToOrder, fetchAllProductsForUser } from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/onlyAdmin").get(authenticate, authorizeAdmin, fetchAllProducts);
router.route("/").get(authenticate, fetchAllProductsForUser);
router.route("/sendOrder").put(authenticate, addProductToOrder);

export default router;
