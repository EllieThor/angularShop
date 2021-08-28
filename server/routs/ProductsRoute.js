const express = require("express");
const router = express.Router();
const productsController = require("../controllers/ProductsController");

router.post("/getCategories", productsController.getCategories);
router.post("/getProducts", productsController.getProducts);
router.post("/getProductsQnt", productsController.getProductsQnt);
router.post("/searchForProd", productsController.searchForProd);
// router.post("/addProductToDb", productsController.getCategoriesFromDb);
// router.post("/UpdateProductInDb", productsController.getCategoriesFromDb);

// http://www.localhost:5001/products/getProducts
//http://www.localhost:5001/products/getCategories
module.exports = router;
