const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  price:{
    type:Number,
    required:true
  },

  description:String,

  image:String,

  category:String,

  stock:{
    type:Number,
    default:50
  },

  discount:{
    type:Number,
    default:0
  }

},{
  timestamps:true
});

module.exports = mongoose.model("Product",productSchema);