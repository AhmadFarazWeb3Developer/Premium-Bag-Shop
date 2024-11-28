const usersModel = require("../../models/users.model");

module.exports.logoutUser = async (req, res, next) => {
  const user = await usersModel.findOne({ email: req.user.email });
  if (user) {
    const token = req.cookies.token;
    res.remove.cookies(token);
    req.flash("success", "User Logged Out Successfully");
    res.redirect("/index");
  } else {
    req.flash("error", "Something went wrong while logging out");
    res.redirect("/shop");
  }
};
