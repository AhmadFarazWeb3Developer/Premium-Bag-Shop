const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");

module.exports.isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.send("Not Verified");
  } else {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
      const user = await userModel
        .findOne({ email: decoded.email })
        .select("-password");

      if (!user) {
        return res.send("No user found. Login or register.");
      }
      req.user = user;
      next();
    } catch (error) {
      return res.redirect("/");
    }
  }
};
