import mongoose from "mongoose";

const AnsweredSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Unanswered",
  },
  selected: {
    type: String,
    required: true,
    isSelected: false,
  },
});

const Answered = mongoose.model("Answered", AnsweredSchema);

export default Answered;
