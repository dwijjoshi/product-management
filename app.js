const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const product = require("./routes/products")
app.use("/api/v1", product);

module.exports = app;

