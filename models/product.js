let mongoose  = require('mongoose');

let productSchema = mongoose.Schema({
    id: {
      type: String
    },
    CategoryId: {
        type: String,
    },
    title: {
      type: String,
    },
    price: {
      type: String,
    },
    quantity: {
      type: String
    },
    seller: {
      type: String
    },
    imageUrl: {
      type: String
    }
});

let Products = module.exports = mongoose.model('Products', productSchema)
