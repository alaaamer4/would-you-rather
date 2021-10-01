import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  password2: {
    type: String,
    minlength: 6,
  },
  token: {
    type: String,
  },
  avatar: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
