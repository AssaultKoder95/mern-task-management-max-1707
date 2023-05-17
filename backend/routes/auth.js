import express from "express";
import {
  isLoggedIn,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/logout", logout);

router.get("/is_logged_in", isLoggedIn);

router.post("/reset-password", resetPassword);

router.post("/update-password", updatePassword);

export default router;
