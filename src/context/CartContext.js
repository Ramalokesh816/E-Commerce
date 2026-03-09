import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");

  /* =========================
     FETCH CART FROM BACKEND
  ========================= */

  const fetchCart = useCallback(async (userId) => {

    if (!userId) return;

    try {

      const res = await axios.get(
        `https://e-commerce-1-ifvn.onrender.com/api/cart/${userId}`
      );

      setCart(res.data.items || []);

    } catch (error) {

      console.error("Error fetching cart:", error);

    }

  }, []);


  /* =========================
     ADD TO CART
  ========================= */

  const addToCart = (product) => {

    const existing = cart.find(
      item => item._id === product._id
    );

    if (existing) {

      setCart(
        cart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        { ...product, quantity: 1 }
      ]);

    }

    /* SHOW TOAST MESSAGE */

    setToast("Item added to cart 🛒");

    setTimeout(() => {
      setToast("");
    }, 3000);

  };


  /* =========================
     REMOVE FROM CART
  ========================= */

  const removeFromCart = (id) => {

    setCart(
      cart.filter(item => item._id !== id)
    );

    setToast("Item removed from cart");

    setTimeout(() => {
      setToast("");
    }, 3000);

  };


  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        fetchCart,
        toast
      }}
    >

      {children}

    </CartContext.Provider>

  );

};