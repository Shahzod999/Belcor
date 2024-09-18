import express from "express";
import formidable from "express-formidable";
import { frtchAllProducts } from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(frtchAllProducts);

export default router;
