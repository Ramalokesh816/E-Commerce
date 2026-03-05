const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  products:[
    {
      productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
      },

      quantity:{
        type:Number,
        default:1
      }
    }
  ],

  total:{
    type:Number,
    required:true
  },

  address:{
    name:String,
    phone:String,
    street:String,
    city:String,
    pincode:String
  },


  /* ORDER STATUS */

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


  /* COURIER */

  courier:{
    type:String,
    default:"Delhivery"
  },


  /* TRACKING ID */

  trackingId:{
    type:String
  },


  /* DELIVERY TIMELINE */

  timeline:[
    {
      step:String,
      date:Date
    }
  ]

},{
  timestamps:true
});


module.exports = mongoose.model("Order",orderSchema);