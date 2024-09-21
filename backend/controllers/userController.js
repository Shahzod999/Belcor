import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all inputs");
  }

  const userExist = await User.findOne({ email });

  if (userExist) return res.status(400).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();

    // Если сохранение прошло успешно, отправляем ответ.
    createToken(res, newUser._id);

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (err) {
    console.error("Ошибка при сохранении пользователя: ", err);
    res.status(400).json({ message: "Invalid user data" });
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Password and Email required");
  }

  const existingUser = await User.findOne({ email });
  
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (isPasswordValid) {
      createToken(res, existingUser._id);
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    } else {
      res.status(401).send("Something wrong or Password");
    }
  } else {
    res.status(401).send("User not registered");
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged Out successfully" });
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { createUser, loginUser, logoutCurrentUser, getCurrentUserProfile };
