import jwt from "jsonwebtoken";
import key from "../config/key.js";

const jwtSecret = key.jwtSecret;

const auth = (req, res, next) => {
  // get token from header
  const token = req.header("x-auth-token");
  //* check if no token
  if (!token) {
    res.status(401).json({
      success: false,
      err: " authorization denied ",
    });
  }
  // verify token
  try {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ err: "Token is not valid" });
      } else {
        // save token in the user in request
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.log("something went wrong");
    res.status(500).json({
      success: false,
      err: "server error",
    });
  }
};

export default auth;
