const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController");

/* PLACE ORDER */

router.post("/place", placeOrder);

/* GET USER ORDERS */

router.get("/:userId", getUserOrders);

/* UPDATE ORDER STATUS */

router.put("/status/:id", updateOrderStatus);

/* DELETE ORDER  */

router.delete("/cancel/:id", deleteOrder);

module.exports = router;