const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/OrdersController");

router.post("/getOrdersQnt", ordersController.getOrdersQnt);

module.exports = router;
