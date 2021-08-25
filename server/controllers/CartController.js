const Carts = require("../models/CartsModel");

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
