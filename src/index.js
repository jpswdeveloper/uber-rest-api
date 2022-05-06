const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const productRouter = require('../routes/ProductQuery')
const categoryRouter = require('../routes/CategoryQuery')
// middleware
app.use(cors());
app.options('*', cors())
app.use(express.json())
app.get('/api/v1', (req, res) => {
    res.status(202).json('its working')
})
// connections
mongoose.connect('mongodb+srv://ted:ted@cluster0.x78q2.mongodb.net/myfoodrecipe?retryWrites=true&w=majority')
    .then(() => {
        console.log('db is connected successfully')
    })
    .catch((err) => {
        console.log(err)
    })

// Mongo DB
app.use('/', (req, res) => {
    res.status(200).json('Ted Uber Recipe APi')
})
app.use('/api/v1/product', productRouter)
app.use('/api/v1/category', categoryRouter)
// listening 
app.listen(process.env.PORT || 3000, () => console.log(`server is running on http://localhost:${3000}/api/v1/`))