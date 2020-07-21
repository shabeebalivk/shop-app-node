const express = require('express');
const router = express.Router();

let Deals = require('../models/deal');
let Products = require('../models/product')


router.get('/', function(req,res){
    Deals.find({}, function (err, dealProduct) {
        res.json(dealProduct)
        });
    });

router.get('/:name', function(req,res){
    Deals.find({'title': req.params.name}, function(err,deal) {
        res.json(deal)
    })})
module.exports = router;
