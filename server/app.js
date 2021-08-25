const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./utils/database");

const CategoriesModel = require("./models/CategoriesModel");
const ProductsModel = require("./models/ProductsModel");
const UsersModel = require("./models/UsersModel");
const CartsModel = require("./models/CartsModel");
const CartsProductsModel = require("./models/CartsProductsModel");
const OrdersModel = require("./models/OrdersModel");

CategoriesModel.hasMany(ProductsModel);
// UsersModel.belongsTo(CartsModel);
CartsModel.belongsTo(UsersModel);
CartsProductsModel.belongsTo(ProductsModel);
CartsModel.hasMany(CartsProductsModel);
OrdersModel.belongsTo(CartsModel);
UsersModel.hasMany(OrdersModel);

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

const UsersRoute = require("./routs/UsersRoute.js");
app.use("/users", UsersRoute);

const CartsRoute = require("./routs/CartsRoute.js");
app.use("/carts", CartsRoute);

const ProductsRoute = require("./routs/ProductsRoute.js");
app.use("/products", ProductsRoute);

const OrdersRoute = require("./routs/OrdersRoute");
app.use("/orders", OrdersRoute);

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
