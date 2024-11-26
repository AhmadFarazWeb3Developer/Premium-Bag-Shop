const mongoose = require('mongoose')

// const dbgr = require("debug")('development:mongoose')
const config = require('config')


const connectDB = mongoose.connect(`${config.get("MONGO_URI")}/Premium-Bag-Shop`).then(() => {
    console.log('MONGO DB CONNECTED ...... ')
}).catch((err) => {
    console.log(err)
});

module.exports = connectDB
