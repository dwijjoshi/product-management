const express = require("express");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  addToCart,
  removeFromCart,
  getAllCartProducts,
  incrementQuantity,
  decrementQuantity,
  paymentMade,
  myOrders,
} = require("../controllers/products");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();
router.route("/single-product/:id").get(getSingleProduct).delete(deleteProduct);
router.route("/products/:sortOptions").get(isAuthenticated, getAllProducts);



router.route("/add-to-cart/:id").get(isAuthenticated,addToCart).delete(removeFromCart);

router.route("/cart").get(isAuthenticated,getAllCartProducts);
router.route("/payment-made").get(isAuthenticated,paymentMade)
router.route('/my-orders').get(isAuthenticated,myOrders)
router.route("/incrementQuantity/:id").get(incrementQuantity);
router.route("/decrementQuantity/:id").get(decrementQuantity);

module.exports = router;
