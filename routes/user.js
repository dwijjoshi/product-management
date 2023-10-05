const express = require("express");
const { register, login, logout, getUser } = require("../controllers/user");
const {isAuthenticated} = require('../middleware/auth')
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route('/user').get(isAuthenticated,getUser)

module.exports = router;
