import express from "express";
import { createUser, loginUser, logoutCurrentUser, getCurrentUserProfile, updateCurrentuserProfile } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router.route("/profile").get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentuserProfile);

export default router;
