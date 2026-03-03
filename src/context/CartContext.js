import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART (always add qty)
  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) return;

    setCart([...cart, { ...product, qty: 1 }]);
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // UPDATE QUANTITY (safe)
  const updateQty = (id, qty) => {
    if (qty < 1 || isNaN(qty)) return;

    setCart(
      cart.map(item =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  // ✅ CLEAR CART (THIS FIXES YOUR ERROR)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart   // 👈 VERY IMPORTANT
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}