import express from "express";
import register from "./server/routes/register.js";
import login from "./server/routes/login.js";
import users from "./server/routes/users.js";
import questions from "./server/routes/questions.js";
import connectDB from "./server/config/mongoDB.js";

import cors from "cors";
const app = express();

connectDB();
app.use(cors());
// parse json files
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/register", register);
app.use("/login", login);
app.use("/users", users);
app.use("/questions", questions);
const PORT = 5000;
app.listen(PORT, () => console.log(`connected to port ${PORT}`));
