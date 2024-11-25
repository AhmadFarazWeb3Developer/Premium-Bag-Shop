const express = require('express')
const app = express()
const connectDB = require('./config/dbConnection')
const cookieParser = require('cookie-parser')
const path = require('path')
const bcrypt = require('bcrypt')

const ownerRoute = require('./routes/owner.route')
const productsRoute = require('./routes/products.route')
const usersRoute = require('./routes/users.route')





app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');



app.use('/owner', ownerRoute)
app.use('/users', usersRoute)
app.use('/products', productsRoute)



connectDB.then((err) => {
    app.listen(3000, (req, res) => {
        console.log("Are you listening me ? ...............")
    })
})