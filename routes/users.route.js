const express = require("express");
const router = express.Router();
const {
  registerUser,
} = require("../controllers/userControllers/registerUser.controller");
const {
  loginUser,
} = require("../controllers/userControllers/loginUser.controller");
const {
  logoutUser,
} = require("../controllers/userControllers/logoutUser.controller");
router.get("/", (req, res) => {
  res.send("Users");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

module.exports = router;
