const Product = require('../models/Products');
const User = require("../models/User");
const Cart = require("../models/Cart")

exports.createProduct = async(req,res) => {
    try {
        const newProduct = {
            image :req.body.image,
            name:req.body.name,
            code:req.body.code,
            releaseDate:req.body.releaseDate,
            price:req.body.price,
            rating:req.body.rating
        }

        const product = await Product.create(newProduct);

        res.status(201).json({
            success:true,
            message:"Product Created Successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllProducts = async(req,res) => {
    try {
        const products = await Product.find();
        res.status(201).json({
            success:true,
            products,
            message:"Products retrieved successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

exports.getSingleProduct = async(req,res) => {
    try {
        const id = req.params.id;
        const singleProduct = await Product.findById(id);

        res.status(201).json({
            success:true,
            singleProduct,
            message:"Single product retrieved successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

exports.deleteProduct = async(req,res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        res.status(201).json({
            success:true,
            message:"Product deleted Successfully"
        }) 
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}

exports.updateProduct = async(req,res) => {
    try {
        const id = req.params.id;
    const newBody = {
        image:req.body.image,
        name:req.body.name,
        code:req.body.code,
        releaseDate:req.body.releaseDate,
        price:req.body.price,
        rating:req.body.rating
    }

    const updatedProduct = await Product.findByIdAndUpdate(id,newBody,{new:true})

    res.status(201).json({
        success:true,
        updatedProduct,
        message:"Product Updated Successfully"
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
    
}

exports.addToCart = async(req,res) => {
    try {
        const id = req.params.id;
        console.log(id);
    const product = await Product.findById(id);
    const cartProductBody = {
        image:product.image,
        name:product.name,
        code:product.code,
        releaseDate:product.releaseDate,
        price:product.price,
        rating:product.rating

    }
    const addedToCart = await Cart.create(cartProductBody);
   
    
    
    res.status(201).json({
        success:true,
        addedToCart,
        message:"Product added to card successfully"
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    


}

exports.removeFromCart = async(req,res) => {
    try {
        const id = req.params.id;
    const deletedProduct =await Cart.findByIdAndDelete(id);
    res.status(201).json({
        success:true,
        message:"Product removed from cart successfully",
        deletedProduct
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
    
}

exports.getAllCartProducts = async(req,res) => {
    try {
        const cartProducts = await Cart.find({});
        res.status(201).json({
            success:true,
            cartProducts,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

