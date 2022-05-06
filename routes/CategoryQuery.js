const route = require('express').Router()
const mongoose = require('mongoose')
// const { Category } = require('../models/Category')
const { Category } = require('../models/Category')

// get all the product with its category
route.get('/', (req, res) => {
    Category.find()
        .then((category) => {
            res.status(202).json(category)
        })
        .catch((err) => {
            res.status(404).json({
                message: "Something went wrong",
                error: err
            })
        })
})
route.post('/addCategory', async (req, res) => {
    // while we add category we should to search itf itsthere
    const cat = await Category.findOne({ name: req.body.name });
    if (cat) {
        return res.status(500).json('already added')
    }

    let cata = new Category({
        name: req.body.name,
        image: req.body.image
    })
    try {
        const catagories = await cata.save()
        if (!catagories) {
            return res.status(404).json('categories are not created properly')
        }
        res.status(200).json(catagories)
    } catch (error) {
        res.status(404).json({
            message: "Something went wrong",
            error: error
        })
    }

})

module.exports = route