const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image:{
        type:Buffer,
        required:[true,"Please enter an Image"]
    },
    name:{
        type:String,
        required:[true,"Please enter a name"]
        },

    code:{
        type:String,
        required:[true,"Please enter a code"]
    },
    releaseDate:{
        type:Date,
        default:Date.now(),
        required:[true,"Please enter a release date."]
    },
    price:{
        type:Number,
        required:[true,"Please enter a number."]
    },
    rating:{
        type:Number,
        required:[true,"Please enter a rating."]
    }
})

module.exports = mongoose.model("Product",productSchema)