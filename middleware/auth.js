const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(req.cookies);
    if (!token) {
      return res.status(401).json({
        message: "Please Login First",
      });
    }

    const decoded = await jwt.verify(token, "JWT_SECRET");
    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    console.log("error");
    res.status(500).json({
      error: error.message,
    });
  }
};
