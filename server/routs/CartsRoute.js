const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/CartController");
// carts
router.post("/createCart", cartsController.createCart);
router.post("/getCarts", cartsController.getCarts);
router.post("/updateIsPaidCartStatus", cartsController.updateIsPaidCartStatus);

//cartsProducts
router.post("/insertProdToCart", cartsController.insertProdToCart);
router.post("/getCartProducts", cartsController.getCartProducts);
router.post("/changeQnt", cartsController.changeQnt);
router.post("/deleteProductFromCart", cartsController.deleteProductFromCart);
module.exports = router;
