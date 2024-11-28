const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");

module.exports.isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "You need to login first");

    return res.redirect("/");
  } else {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
      const user = await userModel
        .findOne({ email: decoded.email })
        .select("-password");

      if (!user) {
        // return res.redirect("No user found. Login or register.");
        res.redirect("/");
      }
      req.user = user;
      next();
    } catch (error) {
      req.flash("error", "You need to login first");
      return res.redirect("/", { error });
    }
  }
};
