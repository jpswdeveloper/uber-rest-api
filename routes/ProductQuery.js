const route = require('express').Router()
const mongoose = require('mongoose')
const { Category } = require('../models/Category')
const { Product } = require('../models/Product')

// get all the product with its category
route.get('/', (req, res) => {
    Product.find().populate('category')
        .then((product) => {
            res.status(202).json(product)
        })
        .catch((err) => {
            res.status(404).json({
                message: "Something went wrong",
                error: err
            })
        })
})
route.post('/addPost', async (req, res) => {
    // check catagory added from the user while addding Posting
    console.log(req.body)
    try {
        const categry = await Category.findById(req.body.category)
        if (!categry) return res.status(500).json({
            message: "category is not found"
        })
        let prdct = new Product({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            resturant_name: req.body.resturant_name,
            images: req.body.images,
            countInStock: req.body.countInStock,
            country: req.body.country,
            rating: req.body.rating,
            price: req.body.price,
            isFeatured: req.body.isFeatured,
            category: req.body.category,
            dateCreated: Date.now()
        })
        const newProduct = await prdct.save()
        res.status(202).json(newProduct)
    }
    catch (err) {
        res.status(404).json({
            message: "Something went wrong",
            error: err
        })
    }
})
// get product by id
route.get('/product/:id', (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({
            message: "Id is not found"
        })
    }
    Product.findById(req.params.id)
        .then(prd => {
            res.status(202).json(prd)
        })
        .catch(err => {
            res.status(404).json({
                message: "product is not found",
                err: err
            })
        })
})

module.exports = route

