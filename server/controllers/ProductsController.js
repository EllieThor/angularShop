const Products = require("../models/ProductsModel");
const Categories = require("../models/CategoriesModel");
const Orders = require("../models/OrdersModel");
// const Orders = require("../models//OrdersModel");

// READ products
exports.getProducts = async (req, res, next) => {
  // await Products.findAndCountAll()
  await Products.findAll()
    .then((prod) => {
      res.send(prod);
    })
    .catch((err) => {
      res.send(err);
    });
};

// READ (categories)
exports.getCategories = async (req, res, next) => {
  await Categories.findAll()
    .then((categories) => {
      res.send(categories);
    })
    .catch((err) => {
      res.send(err);
    });
};

// // READ products & order amount
exports.getProductsQnt = async (req, res, next) => {
  await Products.count()
    .then((prod) => {
      res.send({ prodCount: prod });
    })
    .catch((err) => {
      res.send(err);
    });
};
