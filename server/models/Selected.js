import mongoose from "mongoose";

const selectedSchema = mongoose.Schema({
  options: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "option",
  },
  selected,
});

const Selected = mongoose.model("Selected", optionsSchema);

export default Options;
