const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./utils/database");

const ProductsModel = require("./models/productsModel");
const UsersModel = require("./models/usersModel");
const CategoriesModel = require("./models/categoriesModel");

CategoriesModel.hasMany(ProductsModel);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// const UsersRoute = require("./routs/UsersRoute.js");
// app.use("/users", UsersRoute);

// const ProductsRoute = require("./routs/ProductsRoute.js");
// app.use("/products", ProductsRoute);

// const CartsRoute = require("./routs/CartsRoute.js");
// app.use("/carts", CartsRoute);

app.use((req, res) => {
  res.send("Page NotFound");
});

sequelize
  .sync()
  .then((result) => {
    app.listen(5001);
    console.log("Connected DB !!");
  })
  .catch((err) => {
    console.log("Error connected DB !!", err);
  });
