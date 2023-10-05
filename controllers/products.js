const Product = require("../models/Products");
const User = require("../models/User");
const Cart = require("../models/Cart");
const multer = require("multer");
const Orders = require("../models/Orders");

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

exports.createProduct =
  (upload.single("image"),
  async (req, res) => {
    try {
      console.log(req.file);

      const newProduct = {
        image: req.file.buffer,
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

exports.getAllProducts = async (req, res) => {
  try {
    console.log(req.params.sortOptions);
    const sortOptions = req.params.sortOptions;
    let sortQuery = {}

    if(sortOptions === "lowest"){
      sortQuery = {price:1}
    }
    else if(sortOptions === "highest"){
      sortQuery = {price:-1}
    }
    
    const products = await Product.find().sort(sortQuery);
    res.status(201).json({
      success: true,
      products,
      message: "Products retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    
    const id = req.params.id;
    const singleProduct = await Product.findById(id);

    if (!singleProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(201).json({
      success: true,
      singleProduct,
      message: "Single product retrieved successfully",
    });
  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);

    res.status(201).json({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    const newBody = {
      image: req.file ? req.file.buffer : product.image,
      name: req.body.name,
      code: req.body.code,
      releaseDate: req.body.releaseDate,
      price: req.body.price,
      rating: req.body.rating,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, newBody, {
      new: true,
    });

    if (!updatedProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
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
};

exports.addToCart = async (req, res) => {
  try {
    // const id = req.params.id;
    // console.log(id);
    // const product = await Product.findById(id);
    // const user = await User.findById(req.user._id);
    // console.log(user)
    // await user.cartProducts.push(product);
    // user.save()
    // const cartProductBody = {
    //   image: product.image,
    //   name: product.name,
    //   code: product.code,
    //   releaseDate: product.releaseDate,
    //   price: product.price,
    //   rating: product.rating,
    // };
    // const addedToCart = await Cart.create(cartProductBody);

    const user = await User.findById(req.user._id);
    const product = await Product.findById(req.params.id);
    const cartProductBody = {
      userId:user,
      productId:product
    }

    const addedToCart = await Cart.create(cartProductBody)


    res.status(201).json({
      success: true,
      addedToCart,
      message: "Product added to card successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Cart.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: "Product removed from cart successfully",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCartProducts = async (req, res) => {
  try {
    console.log(req.user._id)
    const cartProducts = await Cart.find({userId:req.user._id}).populate('productId');
    console.log(cartProducts);
    res.status(201).json({
      success: true,
      cartProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.incrementQuantity = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Cart.findById(id);
    product.quantitiy += 1;
    await product.save();
    res.status(201).json({
      success: true,
      message: "Quantity increased.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.decrementQuantity = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Cart.findById(id);
    product.quantitiy -= 1;
    await product.save();
    res.status(201).json({
      success: true,
      message: "Quantity Decremented",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.paymentMade = async(req,res) => {
  try {
    const userId = req.user._id;
  const cartProducts = await Cart.find({userId});
  console.log(cartProducts);
  for (const cartProduct of cartProducts){
    const order = new Orders({
      userId:cartProduct.userId,
      productId:cartProduct.productId,
      quantitiy:cartProduct.quantitiy
    });
    await order.save();
    await Cart.deleteMany({ userId: userId });
  }
  
  res.status(201).json({
    success:true,
    message:"Hello",
    
  })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
  

}

exports.myOrders = async(req,res) => {

  try {
    const userId = req.user._id;
  const orders = await Orders.find({userId}).populate('productId');
  res.status(201).json({
    success:true,
    orders
  })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.messages
    })
    
  }
  


}
