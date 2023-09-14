const mongoose = require('mongoose');

exports.connectDatabase = () => {
    mongoose.connect("mongodb+srv://dwijjoshi02:wCWodehFcPqYOg74@product-management.gez8vcg.mongodb.net/")
    .then((con)=>console.log(`Database connected : ${con.connection.host}`))
    .catch((err)=>console.log(err))
};