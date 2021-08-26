const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/CartController.js");

router.post("/createCart", cartsController.createCart);
router.post("/insertProdToCartProducts", cartsController.insertProdToCartProducts);
router.post("/getCarts", cartsController.getCarts);
router.post("/getCartProducts", cartsController.getCartProducts);
module.exports = router;
