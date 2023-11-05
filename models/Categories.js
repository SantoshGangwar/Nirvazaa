const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: String,
  categoryImage: String,

  products: [
    {
      productname: String,
      productImage: String,
      Material: String,
      productCode: String,
      size: String,
      Price: Number
    }]
});

const Categories = mongoose.model('Categories', categorySchema);
module.exports = Categories; 
