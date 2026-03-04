const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
  clearCart
} = require("../controllers/cartController");

/* ADD TO CART */

router.post("/add", addToCart);

/* GET USER CART */

router.get("/:userId", getCart);

/* REMOVE ITEM */

router.delete("/remove/:id", removeCartItem);

/* UPDATE QUANTITY */

router.put("/update/:id", updateCartItem);

/* CLEAR CART AFTER ORDER */

router.delete("/clear/:userId", clearCart);

module.exports = router;