const express = require('express');
const {getProducts} = require('../controllers/product.controller');
const {createProduct} =require('../controllers/product.controller');
const {getOneProduct} = require('../controllers/product.controller');
const {updateProduct} = require('../controllers/product.controller');
const {deleteProduct} = require('../controllers/product.controller');
const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id/edit", updateProduct);
router.delete("/:id/delete" ,deleteProduct);
router.get("/:id", getOneProduct);

module.exports = {
    productRouter: router
}