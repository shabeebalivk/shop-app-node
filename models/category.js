let mongoose  = require('mongoose');

let categorySchema = mongoose.Schema({
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

let Categorys = module.exports = mongoose.model('Categorys', categorySchema)
