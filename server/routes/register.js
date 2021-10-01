import { Router } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import key from "../config/key.js";

const router = Router();

// route => "/register"
// method => POST
// register new users
router.post(
  "/",
  [
    check("email", "please provide a valid email").isEmail(),
    check("password", "please provide a valid password").isLength({ min: 6 }),
    check("name", "username is required").isString(),
    check("avatar", "please select a photo").isString(),
  ],
  async (req, res) => {
    // input validation
    const errors = validationResult(req);
    !errors.isEmpty() && res.status(400).json({ errors: errors.array() });
    // check if user already exists
    try {
      const { email, password, name, password2, avatar } = req.body;
      let user = await User.findOne({ email });
      user &&
        res.status(400).json({
          success: false,
          err: "this user already exist",
        });

      user = new User({ email, password, name, avatar });
      if (password2 && password === password2) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const jwtSecret = key.jwtSecret;
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(payload, jwtSecret, (err, token) => {
          if (err) {
            throw err;
          }
          res.status(200).json({
            success: true,
            token,
          });
        });
      } else {
        res.status(400).json({
          success: false,
          error: "the passwords doesn't match",
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        success: false,
        err: "server error ",
      });
    }
  }
);

export default router;
