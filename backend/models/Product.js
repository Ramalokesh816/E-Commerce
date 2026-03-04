const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name: String,
  price: Number,
  category: String,
  image: String,
  description: String,
  stock: Number,

  discount: {
    type: Number,
    default: 0
  },

  dealExpiry: Date

});

module.exports = mongoose.model("Product", productSchema);