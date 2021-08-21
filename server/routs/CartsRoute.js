const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/CartController.js");

router.post("/getCarts", cartsController.getCarts);
router.post("/createCart", cartsController.createCart);
module.exports = router;
