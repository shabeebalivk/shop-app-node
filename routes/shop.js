const express = require('express');
const router = express.Router();

let Products = require('../models/product');
let Shops = require('../models/shop');

router.get('/', function(req,res){
    console.log('ok')
    Shops.find({}, function (err, shops) {
        res.json(shops)
        });
    });
router.get('/:name', function(req,res){
    Shops.find({'title': req.params.name}, function(err, shop) {
        Products.find({'seller': shop.title}, function (err, product) {
            res.json(product)
            });
        });
    })

module.exports = router;
