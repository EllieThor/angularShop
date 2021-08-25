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
