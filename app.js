const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const path = require("path");

const expressSession = require("express-session");
const flash = require("connect-flash");

const indexRoute = require("./routes/index");
const ownerRoute = require("./routes/owner.route");
const productsRoute = require("./routes/products.route");
const usersRoute = require("./routes/users.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

app.set("view engine", "ejs");

app.use(flash());
app.use(indexRoute);
app.use("/owner", ownerRoute);
app.use("/users", usersRoute);
app.use("/product", productsRoute);

connectDB
  .then(() => {
    app.listen(3000, (req, res) => {
      console.log("Are you listening me ? ...............");
    });
  })
  .catch((err) => {
    console.log(err);
  });
