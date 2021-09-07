const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/CartController.js");
// carts
router.post("/createCart", cartsController.createCart);
router.post("/getCarts", cartsController.getCarts);
router.post("/updateCartIsPaid", cartsController.updateCartIsPaid);

//cartsProducts
router.post("/insertProdToCartProducts", cartsController.insertProdToCartProducts);
router.post("/getCartProducts", cartsController.getCartProducts);
router.post("/changeQnt", cartsController.changeQnt);
router.post("/deleteProductFromCart", cartsController.deleteProductFromCart);
module.exports = router;
