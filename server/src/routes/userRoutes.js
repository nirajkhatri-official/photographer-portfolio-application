import express from "express";
import {
  signup,
  login,
  logoutUser,
  forgetPassword,
  resetPassword,
} from "../controllers/userController.js";
import {
  validateLogin,
  validateSignup,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/signin", validateLogin, login);
router.post("/logout", logoutUser);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

export default router;
