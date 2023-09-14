const express = require('express');
const { createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct, addToCart, removeFromCart, getAllCartProducts } = require('../controllers/products');

const router = express.Router();

router.route('/products').post(createProduct).get(getAllProducts)

router.route('/products/:id').get(getSingleProduct).delete(deleteProduct).put(updateProduct)

router.route('/add-to-cart/:id').get(addToCart).delete(removeFromCart)

router.route('/cart').get(getAllCartProducts)

module.exports = router;