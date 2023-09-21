const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const Product = require('./models/Products');

const multer = require('multer')


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

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const product = require("./routes/products");
const { updateProduct } = require("./controllers/products");
app.use("/api/v1", product);

app.put("/api/v1/products/:id",upload.single('image'),async(req,res) => {
    try {
        const id = req.params.id;
        console.log(id);
        console.log(req.body);
        const imageBuffer = req.file.buffer; 
    const newBody = {
        image:imageBuffer,
        name:req.body.name,
        code:req.body.code,
        releaseDate:req.body.releaseDate,
        price:req.body.price,
        rating:req.body.rating
    }

    const updatedProduct = await Product.findByIdAndUpdate(id,newBody,{new:true})
    console.log(updatedProduct);
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
    
})

app.post("/api/v1/products",upload.single('image'),async (req,res)=>{
    
    try {
        console.log("Hello");
        
        const imageBuffer = req.file.buffer; 
        console.log(imageBuffer);
    
        const newProduct = {
            image :imageBuffer,
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
})



module.exports = app;

