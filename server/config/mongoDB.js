import mongoose from "mongoose";
import key from "./key.js";

const connect = key.mongoURL;

const connectDB = async () => {
  try {
    await mongoose.connect(connect, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    });
    console.log("connected to DB successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
