const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({

    image: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    isAdmin: Boolean,
    bgColor: String,
    panelColor: String,
    textColor: String,

})

module.exports = mongoose.model('product', productsSchema) 