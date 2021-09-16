const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/OrdersController");

router.post("/getOrdersQnt", ordersController.getOrdersQnt);
router.post("/getOrdersDates", ordersController.getOrdersDates);
router.post("/insertNewOrder", ordersController.insertNewOrder);

module.exports = router;
