import { Router } from "express";
import User from "../models/User.js";
import auth from "../middlewares/auth.js";

const router = Router();

// route => /login
// access => private
// method => get
//@ get logged in user
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        err: "there is no users",
      });
    }
    res.status(200).json({
      success: true,
      user: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err: "server error",
    });
  }
});

export default router;
