const usersModel = require("../../models/users.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/generateToken");

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("error", "All Fields are required to be filled");
      return res.redirect("/");
    }

    const user = await usersModel.findOne({ email });

    if (!user) {
      req.flash("error", "User doesn't exist");
      res.redirect("/");
    } else {
      const isMatched = await bcrypt.compare(password, user.password);

      console.log("Password match:", isMatched);

      if (isMatched) {
        const token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");
        // return res.status(201).json({ message: "User logged in successfully" });
      } else {
        req.flash("error", "Password doesn't Match");
        res.redirect("/");
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
