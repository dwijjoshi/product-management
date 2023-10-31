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
  addProduct,
  editProduct,
} = require("../controllers/products");

const multer = require("multer");

const storage = multer.memoryStorage({
  // destination: (req, file, cb) => {
  //     cb(null, 'uploads/'); // Set the destination folder where files will be stored
  //   },
  //   filename: (req, file, cb) => {
  //     // Set the filename to be the current date and time + the original file name
  //     cb(null, Date.now() + '-' + file.originalname);
  //   },
}); // Store the image in memory
const upload = multer({ storage: storage });
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();
router.route("/single-product/:id").get(isAuthenticated,getSingleProduct).delete(isAuthenticated,deleteProduct);
router.route("/products/:sortOptions").get(isAuthenticated, getAllProducts);
router.route('/add-product').post(upload.single("image"),isAuthenticated,addProduct)
router.route('/edit-product/:id').put(upload.single("image"),isAuthenticated,editProduct)

router.route("/add-to-cart/:id").get(isAuthenticated,addToCart).delete(isAuthenticated,removeFromCart);

router.route("/cart").get(isAuthenticated,getAllCartProducts);
router.route("/payment-made").get(isAuthenticated,paymentMade)
router.route('/my-orders').get(isAuthenticated,myOrders)
router.route("/incrementQuantity/:id").get(isAuthenticated,incrementQuantity);
router.route("/decrementQuantity/:id").get(isAuthenticated,decrementQuantity);

module.exports = router;
