import { Router } from "express";
import { check, validationResult } from "express-validator";
import Unanswered from "../models/Unanswered.js";
import Answered from "../models/Answered.js";
import auth from "../middlewares/auth.js";

const router = Router();
// route => "/questions"
// Create new question
// access => private

router.post(
  "/",
  auth,
  [
    check("option1").notEmpty().withMessage("options are required"),
    check("option2").notEmpty().withMessage("options are required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { option1, option2 } = req.body;
      const options = new Unanswered({ user: req.user.id, option1, option2 });
      console.log(req.body);
      await options.save();
      res.status(200).json({
        success: true,
        msg: "options created successfully",
        options,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        err: "server error ",
      });
    }
  }
);

// route => "/questions/answered"
// Create new question
// access => private

router.post(
  "/answered",
  auth,
  [
    check("question").notEmpty().withMessage("please specify a question"),
    check("answer").notEmpty().withMessage("please select an answer"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { question, answer } = req.body;
      const options = new Answered({
        user: req.user.id,
        question,
        selected: answer,
      });

      await options.save();
      res.status(200).json({
        success: true,
        data: options,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        err: "server error ",
      });
    }
  }
);

// get all unanswered
// method => get
// access => private
// route => "/unanswered"
router.get("/unanswered", auth, async (req, res) => {
  try {
    const options = await Unanswered.find();
    res.status(200).json({ success: true, options });
  } catch (err) {
    res.status(500).json({
      success: false,
      err: "server error ",
    });
  }
});

// get all answered
// method => get
// access => private
// route => "/answered"
router.get("/answered", auth, async (req, res) => {
  try {
    const answers = await Answered.find();
    res.status(200).json({ success: true, answers });
  } catch (err) {
    res.status(500).json({
      success: false,
      err: "server error ",
    });
  }
});
export default router;
