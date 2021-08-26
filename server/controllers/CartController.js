const Carts = require("../models/CartsModel");
const CartsProductsModal = require("../models/CartsProductsModel");
const ProductsModel = require("../models/ProductsModel");

// READ (carts)
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

// READ (cartProducts)
exports.getCartProducts = async (req, res, next) => {
  await CartsProductsModal.findAll({
    include: [{ model: ProductsModel, attributes: ["ProductName", "Price", "ImageName"] }],
    where: { cartID: req.body.cartID },
  })
    .then((cart) => {
      res.send(cart);
    })
    .catch((err) => {
      res.send(err);
    });
};

// CREATE (carts)
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

// CREATE (cartProducts)
exports.insertProdToCartProducts = async (req, res, next) => {
  let addOBJ = {
    cartID: req.body.cartID,
    productID: req.body.productID,
    Qnt: 1,
    TotalPrice: req.body.TotalPrice,
  };

  await CartsProductsModal.create(addOBJ)
    .then((products) => {
      res.send(products);
      console.log("Product 25/08/21: ", products);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
};
// UPDATE (cartItems)
exports.changeQnt = async (req, res) => {
  let setQuantity = req.body.quantity;
  req.body.type == 2 && req.body.quantity > 1 ? (setQuantity = setQuantity - 1) : req.body.type == 2 && req.body.quantity == 1 ? (setQuantity = 1) : (setQuantity = setQuantity + 1);
  let changesOBJ = {
    Qnt: setQuantity,
  };

  await CartsProductsModal.update(changesOBJ, { where: { cartID: req.body.cartID, productID: req.body.productID } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};
// DELETE (cartItems)
exports.deleteProductFromCart = async (req, res) => {
  await CartsProductsModal.destroy({ where: req.body })
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

//  `Qnt`, `TotalPrice`, `createdAt`, `updatedAt`, `productID`, `cartID`;
