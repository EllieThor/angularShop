const Products = require("../models/ProductsModel");
const Categories = require("../models/CategoriesModel");
const Orders = require("../models/OrdersModel");
const { Op } = require("sequelize");

// READ (products)
exports.getProducts = async (req, res, next) => {
  await Products.findAll({ where: { categoryID: req.body.categoryID } })
    .then((prod) => {
      res.send(prod);
    })
    .catch((err) => {
      res.send(err);
    });
};

// CREATE (products)
exports.insertProd = async (req, res, next) => {
  let addOBJ = {
    ProductName: req.body.ProductName,
    Price: req.body.Price,
    Description: req.body.Description,
    ImageName: req.body.ImageName,
    categoryID: req.body.CategoryID,
  };
  // `ProductName`, `Price`, `Description`, `ImageName`, `categoryID`
  await Products.create(addOBJ)
    .then((result) => {
      res.send(result);
      console.log("result: ", result);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
};

// READ (categories)
exports.getCategories = async (req, res, next) => {
  await Categories.findAll({ order: [["ID", "DESC"]] })
    .then((categories) => {
      res.send(categories);
    })
    .catch((err) => {
      res.send(err);
    });
};

//  READ (productsQnt)
exports.getProductsQnt = async (req, res, next) => {
  await Products.count()
    .then((prod) => {
      res.send({ prodCount: prod });
    })
    .catch((err) => {
      res.send(err);
    });
};

// READ (search products)
exports.searchForProd = async (req, res, next) => {
  await Products.findAll({
    where: {
      ProductName: {
        [Op.like]: `%${req.body.searchFor}%`,
      },
    },
  })
    .then((prod) => {
      res.send(prod);
    })
    .catch((err) => {
      res.send(err);
    });
};
