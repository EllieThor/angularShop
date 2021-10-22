const express = require("express");
const app = express();

// require("dotenv").config();

const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./utils/database");

const CategoriesModel = require("./models/categoriesModel");
const ProductsModel = require("./models/productsModel");
const UsersModel = require("./models/usersModel");
const CartsModel = require("./models/CartsModel");
const CartsProductsModel = require("./models/CartsProductsModel");
const OrdersModel = require("./models//OrdersModel");

CategoriesModel.hasMany(ProductsModel);
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
  // origin: "*",
  origin: "https://grocery-online.netlify.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//s
app.use(cors(corsOptions));

const UsersRoute = require("./routs/UsersRoute");
app.use("/users", UsersRoute);

const CartsRoute = require("./routs/CartsRoute");
app.use("/carts", CartsRoute);

const ProductsRoute = require("./routs/ProductsRoute");
app.use("/products", ProductsRoute);

const OrdersRoute = require("./routs/OrdersRoute");
app.use("/orders", OrdersRoute);

app.use((req, res) => {
  res.send("Page NotFound!");
});

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 5001);
    console.log("Connected DB !!");
  })
  .catch((err) => {
    console.log("Error connected DB !!", err);
  });
