const express = require('express');
const { createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct, addToCart, removeFromCart, getAllCartProducts, incrementQuantity, decrementQuantity } = require('../controllers/products');

const router = express.Router();



router.route('/products').get(getAllProducts)

router.route('/products/:id').get(getSingleProduct).delete(deleteProduct)

router.route('/add-to-cart/:id').get(addToCart).delete(removeFromCart)

router.route('/cart').get(getAllCartProducts)

router.route('/incrementQuantity/:id').get(incrementQuantity)
router.route('/decrementQuantity/:id').get(decrementQuantity)

module.exports = router;