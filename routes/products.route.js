const express = require("express");
const router = express.Router();

const productsModel = require("../models/products.model");
const { upload } = require("../config/multerConfig");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgColor, panelColor, textColor } = req.body;

    const product = await productsModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgColor,
      panelColor,
      textColor,
    });

    req.flash("success", "Product created Successfully");

    return res.redirect("/owner/admin");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
