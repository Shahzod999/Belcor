import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
dotenv.config();

const frontendURL = process.env.FRONTEND_URL;
console.log(frontendURL);
const port = process.env.PORT || 5001;

connectDB();

const app = express();

app.use(
  cors({
    origin: frontendURL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
); // снова забыл
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/belcor/products", productRoutes);
app.use("/belcor/user", userRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});
console.log("heelo");
