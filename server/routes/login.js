import { Router } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import key from "../config/key.js";
import auth from "../middlewares/auth.js";
const router = Router();
const jwtSecret = key.jwtSecret;
// route => /login
// access => public
// method => POST
//@ chick if user and get token
router.post(
  "/",
  [
    check("email").notEmpty().withMessage("email is required"),
    check("password").notEmpty().withMessage("please enter your password"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      // chick email
      let user = await User.findOne({ email });
      if (!email) {
        return res.status(404).json({
          success: false,
          err: "invalid credentials",
        });
      }
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(404).json({
          success: false,
          err: "invalid credentials",
        });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, jwtSecret, (err, token) => {
        if (err) throw err;
        if (!err)
          return res.status(200).json({
            success: true,
            token: token,
          });
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        err: "server error",
      });
    }
  }
);

// route => /login
// access => private
// method => get
//@ get logged in user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        err: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err: "server error",
    });
  }
});

export default router;
