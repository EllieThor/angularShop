const express = require("express");
const router = express.Router();
const productsController = require("../controllers/ProductsController.js");
const categoriesController = require("../controllers/CategoriesController.js");

router.post("/getCategoriesFromDb", categoriesController.getCategoriesFromDb);
router.post("/getProductsFromDb", productsController.getProductsFromDb);
router.post("/addProductToDb", productsController.getCategoriesFromDb);
router.post("/UpdateProductInDb", productsController.getCategoriesFromDb);

// http://www.localhost:5001/products/getProductsFromDb
//http://www.localhost:5001/products/getCategoriesFromDb
module.exports = router;
