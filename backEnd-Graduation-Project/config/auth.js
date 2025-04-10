const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.compare = async (password, savedPassword) => {
  return await bcrypt.compare(password, savedPassword);
};

exports.createToken = (myObj) => {
  return jwt.sign(myObj, SECRET_KEY, { expiresIn: "1h" });
};

exports.authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send("Access denied, access token missing");
    } else {
      const verified = jwt.verify(token, SECRET_KEY);
      if (verified) {
        req.user = verified;
        next();
      } else {
        return res.status(401).send("Access denied, wrong access token");
      }
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// exports.adminMiddleware = (req, res, next) => {
//   if (req.user?.role !== 'admin') {
//     return res.status(403).send("Access denied, admin privileges required");
//   }
//   next();
// };