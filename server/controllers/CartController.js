const Carts = require("../models/CartsModel");
const CartsProducts = require("../models/CartsProductsModel");
const ProductsModel = require("../models/CartsProductsModel");

// READ
exports.getCarts = async (req, res, next) => {
  await Carts.findAll({
    where: { userID: req.body.userID },
    order: [["createdAt", "DESC"]],
  })
    .then((cart) => {
      res.send(cart);
    })
    .catch((err) => {
      res.send(err);
    });
};

// READ
exports.getCartProducts = async (req, res, next) => {
  await CartsProducts.findAll({
    // include: [{ model: ProductsModel, attributes: ["ProductName", "Price", "ImageName"] }],
    where: { cartID: req.body.cartID },
  })
    .then((cart) => {
      res.send(cart);
    })
    .catch((err) => {
      res.send(err);
    });
};

// CREATE
exports.createCart = async (req, res, next) => {
  let newUserOBJ = {
    userID: req.body.userID,
  };
  // await Carts.create(req.body)
  await Carts.create(newUserOBJ)
    .then((user) => {
      res.send(user);
      console.log("Jane's auto-generated ID:", user.ID);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.send(err);
    });
};

// CREATE (cartItems)
exports.insertProdToCartProducts = async (req, res, next) => {
  let addOBJ = {
    cartID: req.body.cartID,
    productID: req.body.productID,
    Qnt: 1,
    TotalPrice: req.body.TotalPrice,
  };

  await CartsProducts.create(addOBJ)
    .then((products) => {
      res.send(products);
      console.log("Product 25/08/21: ", products);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
};
//  `Qnt`, `TotalPrice`, `createdAt`, `updatedAt`, `productID`, `cartID`;
