import express from "express";
import { createUser, loginUser, logoutCurrentUser, getCurrentUserProfile } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router.route("/profile").get(authenticate, getCurrentUserProfile);

export default router;