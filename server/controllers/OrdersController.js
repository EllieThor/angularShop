const Orders = require("../models/OrdersModel");

// READ order amount
exports.getOrdersQnt = async (req, res, next) => {
  await Orders.count()
    .then((prod) => {
      res.send({ ordersCount: prod });
    })
    .catch((err) => {
      res.send(err);
    });
};

// READ order dates
exports.getOrdersDates = async (req, res, next) => {
  // SELECT `ShippingDate`,`cartID` FROM `orders` ORDER BY orders.ShippingDate DESC
  await Orders.findAll({
    attributes: ["ShippingDate", "ShippingDate"],
    order: [["createdAt", "DESC"]],
  })
    .then((prod) => {
      res.send({ ordersCount: prod });
    })
    .catch((err) => {
      res.send(err);
    });
};

// CREATE order
exports.insertNewOrder = async (req, res, next) => {
  await Orders.create(req.body)
    .then((order) => {
      res.send(order);
    })
    .catch((err) => {
      res.send(err);
    });
};
