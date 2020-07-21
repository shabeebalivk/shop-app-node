let mongoose  = require('mongoose');

let shopSchema = mongoose.Schema({
    id: {
      type: String
    },
    title: {
      type: String,
    },
    imageUrl: {
      type: String
    }
});

let Shops = module.exports = mongoose.model('Shops', shopSchema)
