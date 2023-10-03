const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Product = require("./models/Products");
const cookieParser = require("cookie-parser");

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
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
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
const { updateProduct, getAllProducts } = require("./controllers/products");
const { isAuthenticated } = require("./middleware/auth");
app.use("/api/v1", product);
app.use("/api/v1", user);

app.put("/api/v1/products/:id", upload.single("image"), async (req, res) => {
  try {
    console.log(req.cookies);
    const id = req.params.id;
    const product = await Product.findById(id);

    const imageBuffer = req.file ? req.file.buffer : product.image;
    const newBody = {
      image: imageBuffer,
      name: req.body.name,
      code: req.body.code,
      releaseDate: req.body.releaseDate,
      price: req.body.price,
      rating: req.body.rating,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, newBody, {
      new: true,
    });
    console.log(updatedProduct);
    res.status(201).json({
      success: true,
      updatedProduct,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/api/v1/products", upload.single("image"), async (req, res) => {
  try {
    console.log("Hello");

    const imageBuffer = req.file.buffer;
    console.log(imageBuffer);

    const newProduct = {
      image: imageBuffer,
      name: req.body.name,
      code: req.body.code,
      releaseDate: req.body.releaseDate,
      price: req.body.price,
      rating: req.body.rating,
    };

    const product = await Product.create(newProduct);

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = app;
