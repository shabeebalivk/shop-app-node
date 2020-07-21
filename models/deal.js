let mongoose  = require('mongoose');

let dealSchema = mongoose.Schema({
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

let Deals = module.exports = mongoose.model('Deals', dealSchema)
