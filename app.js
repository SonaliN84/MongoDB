const path = require("path");
const env = require("dotenv");
env.config();
const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");

const User = require("./models/user");
const errorController = require("./controllers/error");



const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("649124b882f855f7c699a9ca")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404);

mongoose
  .connect('mongodb+srv://sonalinilekar:TKvjzWWw6o1ByuHZ@cluster0.3axas1n.mongodb.net/shop?retryWrites=true&w=majority')
  .then((result) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>connected")
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
