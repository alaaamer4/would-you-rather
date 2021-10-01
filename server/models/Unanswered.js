import mongoose from "mongoose";

const UnansweredSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  option1: {
    type: String,
    required: true,
    isSelected: false,
  },
  option2: {
    type: String,
    required: true,
    isSelected: false,
  },
});

const Unanswered = mongoose.model("Unanswered", UnansweredSchema);

export default Unanswered;
