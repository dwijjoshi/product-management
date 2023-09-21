const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    image:{
        type:Buffer,
        required:[true,"Please enter an image"]
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
    },

    amount:{
        type:Number,
        default:0
    },
    quantity:{
        type:Number,
        default:1
    }

})

module.exports = mongoose.model("Cart",cartSchema)