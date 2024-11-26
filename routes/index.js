const express = require("express");
const { isLoggedIn } = require("../middlewares/isloggedIn.middleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/shop", isLoggedIn, (req, res) => {
  res.send("Welcome to shop");
});
module.exports = router;
