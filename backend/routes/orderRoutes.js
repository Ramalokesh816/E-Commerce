const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder
} = require("../controllers/orderController");


/* PLACE ORDER */

router.post("/place",placeOrder);


/* GET USER ORDERS */

router.get("/:userId",getUserOrders);


/* GET ORDER DETAILS */

router.get("/details/:id",getOrderById);


/* UPDATE STATUS (ADMIN) */

router.put("/status/:id",updateOrderStatus);


/* CANCEL ORDER */

router.delete("/cancel/:id",cancelOrder);


module.exports = router;