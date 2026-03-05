const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  stock: {
    type: Number,
    default: 0
  },

  /* DISCOUNT FOR DEALS PAGE */
  discount: {
    type: Number,
    default: 0
  },

  /* DEAL EXPIRY DATE */
  dealExpiry: {
    type: Date,
    default: null
  }

},
{
  timestamps: true   // automatically creates createdAt and updatedAt
});

module.exports = mongoose.model("Product", productSchema);