import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// app.use(cors()); // снова забыл
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/belcor/products", productRoutes);
app.use("/belcor/user", userRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));

console.log("heelo");
