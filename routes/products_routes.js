const express = require("express");
const { demo, getAllProducts, getProductById } = require("../controller/product_cont");

const router = express.Router();

router.get("/", demo);

router.get("/products", getAllProducts);

router.get("/products/:productId", getProductById);

module.exports = router;