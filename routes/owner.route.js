const express = require("express");
const router = express.Router();

const ownerModel = require("../models/owner.model");

router.post("/create", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      res.status(401).json({
        message: "Unauthorized , One owner at a time",
      });
    } else {
      const createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
      });

      res.status(201).json({
        message: "Owner Created",
        createdOwner,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
