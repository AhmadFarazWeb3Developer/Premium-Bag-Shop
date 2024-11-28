const usersModel = require("../../models/users.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      req.flash("error", "All Fields are required to be field");
      return res.redirect("/");
    }

    const user = await usersModel.findOne({ email });

    if (user) {
      req.flash("error", "You are already registered, Please Login!");
      res.redirect("/");
    }

    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.send(err);
        } else {
          const createdUser = await usersModel.create({
            fullname,
            email,
            password: hash,
          });
          if (createdUser) {
            const token = generateToken(createdUser);
            res.cookie("token", token);
            res.redirect("/shop");
            // res
            //   .status(201)
            //   .json({ message: "User Registered  Successfully", createdUser });
          }
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
