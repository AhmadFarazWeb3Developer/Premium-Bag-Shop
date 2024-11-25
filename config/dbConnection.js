const mongoose = require('mongoose')

const connectDB = mongoose.connect('mongodb://localhost:27017/Premium-Bag-Shop').then(() => {
    console.log('MONGO DB CONNECTED ...... ')
}).catch((err) => {
    console.error(err)
});

module.exports = connectDB
