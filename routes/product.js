const express = require('express');
const router = express.Router();

let Products = require('../models/product');

router.get('/', function(req,res){
    Products.find({}, function (err, product) {
        res.json(product)
        });
    });

router.get('/:name', function(req,res){
    Products.findOne({'title': req.params.name}, function (err, product) {
        res.json(product)
        });
    });

module.exports = router;
