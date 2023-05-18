import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import createError from "../utils/error.js";

export const login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(
      createError({
        message: "Email and password are required",
        status: 400,
      })
    );
  }

  try {
    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
    }).select("name email password");
    if (!user) {
      return next(
        createError({ status: 404, message: "User not found with the email" })
      );
    }
    const isPasswordCorrect = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(
        createError({ status: 400, message: "Password is incorrect" })
      );
    }
    const payload = {
      id: user._id,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ name: user.name, email: user.email, message: "login success" });
  } catch (err) {
    return next(err);
  }
};

export const register = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return next(
      createError({
        message: "Name, Email & password are required",
        statusCode: 400,
      })
    );
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json("New User Created");
  } catch (err) {
    return next(err);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "logout success" });
};

export const isLoggedIn = async (req, res) => {
  const token = req.cookies.access_token;
  console.log(req.cookies);

  if (!token) {
    return res.json(false);
  }
  return jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.json(false);
    }
    return res.json(true);
  });
};

export const resetPassword = async (req, res) => res.json({ status: "OK" });

export const updatePassword = async (req, res) => res.json({ status: "OK" });
