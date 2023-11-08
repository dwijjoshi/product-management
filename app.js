const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

const user = require("./routes/user");
const product = require("./routes/products");

app.use("/api/v1", product);
app.use("/api/v1", user);

module.exports = app;
