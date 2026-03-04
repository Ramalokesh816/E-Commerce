const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  products:[
    {
      productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
      },
      quantity:Number
    }
  ],

  total:Number,

  address:Object,

  status:{
    type:String,
    enum:[
      "Placed",
      "Packed",
      "Shipped",
      "Out for Delivery",
      "Delivered"
    ],
    default:"Placed"
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("Order",orderSchema);