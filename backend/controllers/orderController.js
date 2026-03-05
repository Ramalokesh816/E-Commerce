const Order = require("../models/Order");


/* =========================
   PLACE ORDER
========================= */

const placeOrder = async (req,res)=>{

  try{

    const { userId, products, total, address } = req.body;

    const order = new Order({

      userId,
      products,
      total,
      address,

      status:"Placed",

      courier:"Delhivery",

      trackingId:"TRK"+Math.floor(Math.random()*1000000),

      timeline:[
        {
          step:"Placed",
          date:new Date()
        }
      ]

    });

    await order.save();

    res.json({
      message:"Order placed successfully",
      order
    });

  }catch(error){

    res.status(500).json({
      message:"Error placing order"
    });

  }

};



/* =========================
   GET USER ORDERS
========================= */

const getUserOrders = async (req,res)=>{

  try{

    const orders = await Order.find({
      userId:req.params.userId
    })
    .populate("products.productId")
    .sort({createdAt:-1});

    res.json(orders);

  }catch(error){

    res.status(500).json({
      message:"Error fetching orders"
    });

  }

};



/* =========================
   GET ORDER BY ID
========================= */

const getOrderById = async (req,res)=>{

  try{

    const order = await Order
      .findById(req.params.id)
      .populate("products.productId");

    if(!order){

      return res.status(404).json({
        message:"Order not found"
      });

    }

    res.json(order);

  }catch(error){

    res.status(500).json({
      message:"Error fetching order"
    });

  }

};



/* =========================
   UPDATE ORDER STATUS
========================= */

const updateOrderStatus = async (req,res)=>{

  try{

    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if(!order){

      return res.status(404).json({
        message:"Order not found"
      });

    }

    order.status = status;

    order.timeline.push({
      step:status,
      date:new Date()
    });

    await order.save();

    res.json({
      message:"Order status updated",
      order
    });

  }catch(error){

    res.status(500).json({
      message:"Error updating order status"
    });

  }

};



/* =========================
   CANCEL ORDER
========================= */

const cancelOrder = async (req,res)=>{

  try{

    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message:"Order cancelled successfully"
    });

  }catch(error){

    res.status(500).json({
      message:"Error cancelling order"
    });

  }

};



module.exports = {

  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder

};