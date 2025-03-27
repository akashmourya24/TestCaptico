const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "testQuicky";

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
};
