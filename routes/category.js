const express = require('express');
const router = express.Router();

let Products = require('../models/product');
let Category = require('../models/category');
let Shop = require('../models/shop')

router.get('/', function(req,res){
    Category.find({}, function (err, category) {
        res.json(category)
        });
    });

router.get('/:name', function(req,res){
    Category.find({'title': req.params.name}, function(err, category) {
        Products.find({'categoryIds': category.id}, function (err, product) {
            res.json(product)
            });
        });
    })

module.exports = router;
