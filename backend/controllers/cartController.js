const Cart = require("../models/Cart");

/* ADD TO CART */

const addToCart = async (req, res) => {

  try {

    const { userId, productId, quantity } = req.body;

    const existing = await Cart.findOne({ userId, productId });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.json({ message: "Cart updated" });
    }

    const cartItem = new Cart({
      userId,
      productId,
      quantity
    });

    await cartItem.save();

    res.json({ message: "Added to cart" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


/* GET USER CART */

const getCart = async (req, res) => {

  try {

    const { userId } = req.params;

    const cart = await Cart
      .find({ userId })
      .populate("productId");

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


/* REMOVE ITEM */

const removeCartItem = async (req, res) => {

  await Cart.findByIdAndDelete(req.params.id);

  res.json({ message: "Item removed" });

};


/* UPDATE QUANTITY */

const updateCartItem = async (req, res) => {

  const item = await Cart.findById(req.params.id);

  item.quantity = req.body.quantity;

  await item.save();

  res.json({ message: "Quantity updated" });

};


/* CLEAR CART AFTER ORDER */

const clearCart = async (req, res) => {

  try {

    const { userId } = req.params;

    await Cart.deleteMany({ userId });

    res.json({ message: "Cart cleared" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


module.exports = {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
  clearCart
};