const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
    quantitiy:{
        type:Number,
        default:1
    }

})

module.exports = mongoose.model("Cart",cartSchema)