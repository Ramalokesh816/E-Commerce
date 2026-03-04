const Order = require("../models/Order");

/* PLACE ORDER */

const placeOrder = async (req, res) => {

  try {

    const { userId, products, total, address } = req.body;

    const order = new Order({
      userId,
      products,
      total,
      address,
      status: "Placed"
    });

    await order.save();

    res.json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {

    res.status(500).json({
      message: "Error placing order"
    });

  }

};


/* GET USER ORDERS */

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


/* GET ALL ORDERS (ADMIN) */

const getAllOrders = async (req,res)=>{

  try{

    const orders = await Order.find()
      .populate("products.productId")
      .sort({createdAt:-1});

    res.json(orders);

  }catch(error){

    res.status(500).json({
      message:"Error fetching orders"
    });

  }

};


/* UPDATE ORDER STATUS */

const updateOrderStatus = async (req,res)=>{

  try{

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new:true }
    );

    if(!order){
      return res.status(404).json({
        message:"Order not found"
      });
    }

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
/* DELETE ORDER */

const deleteOrder = async (req,res)=>{

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
  getAllOrders,
  updateOrderStatus,
  deleteOrder
};