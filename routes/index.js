const express = require("express");
const { isLoggedIn } = require("../middlewares/isloggedIn.middleware");
const productsModel = require("../models/products.model");
const usersModel = require("../models/users.model");
const router = express.Router();
router.get("/", (req, res) => {
  const error = req.flash("error");
  res.render("index", { error, loggedIn: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  const products = await productsModel.find();
  const success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/addtocart/:productId", isLoggedIn, async (req, res) => {
  const user = await usersModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productId);
  await user.save();

  req.flash("success", "Added to Cart");

  res.redirect("/shop");
});

router.get("/cart", isLoggedIn, async (req, res) => {
  const user = await usersModel
    .findOne({ email: req.user.email })
    .populate("cart");

  const totalAmount = Number(user.cart.price) + 20 - Number(user.cart.discount);
  res.render("cart", { user, totalAmount });
});

module.exports = router;
