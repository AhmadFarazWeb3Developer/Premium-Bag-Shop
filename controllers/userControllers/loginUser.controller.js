const usersModel = require("../../models/users.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/generateToken");

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersModel.findOne({ email });
    console.log(user);
    console.log(email);

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    } else {
      const isMatched = await bcrypt.compare(password, user.password);

      console.log("Password match:", isMatched);

      if (isMatched) {
        const token = generateToken(user);
        res.cookie("token", token);
        return res.status(201).json({ message: "User logged in successfully" });
      } else {
        res.status(401).json({
          message: "Password doesn't match",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
