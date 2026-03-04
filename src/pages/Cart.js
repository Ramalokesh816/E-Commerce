import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Cart.css";

function Cart() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const userId = localStorage.getItem("userId");

  /* LOGIN CHECK */

  useEffect(() => {

    if (!userId) {

      navigate("/login");
      return;

    }

  }, [userId, navigate]);


  /* FETCH CART */

  useEffect(() => {

    const fetchCart = async () => {

      if (!userId) return;

      try {

        const res = await axios.get(
          `http://localhost:5000/api/cart/${userId}`
        );

        setCartItems(res.data);

      } catch (error) {

        console.error("Cart fetch error:", error);

      }

    };

    fetchCart();

  }, [userId]);


  /* REMOVE ITEM */

  const removeItem = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/cart/remove/${id}`
      );

      setCartItems(
        cartItems.filter(item => item._id !== id)
      );

    } catch (error) {

      console.error(error);

    }

  };


  /* UPDATE QUANTITY */

  const updateQty = async (id, qty) => {

    if (qty < 1) return;

    try {

      await axios.put(
        `http://localhost:5000/api/cart/update/${id}`,
        { quantity: qty }
      );

      setCartItems(
        cartItems.map(item =>
          item._id === id
            ? { ...item, quantity: qty }
            : item
        )
      );

    } catch (error) {

      console.error(error);

    }

  };


  /* TOTAL */

  const total = cartItems.reduce(
    (sum, item) =>
      sum + (item.productId?.price || 0) * item.quantity,
    0
  );


  const formatINR = (value) =>
    value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR"
    });


  return (
    <>
      <Header />

      <section className="cart-page">

        <h1>Your Cart</h1>

        {cartItems.length === 0 && (

          <div className="empty-cart">
            <h2>Your cart is empty 🛒</h2>
          </div>

        )}

        {cartItems.map((item) => (

          <div key={item._id} className="cart-item">

            <img
              src={item.productId?.image}
              alt={item.productId?.name}
            />

            <div className="cart-details">

              <h4>{item.productId?.name}</h4>

              <p>
                {formatINR(item.productId?.price || 0)}
              </p>

              <div className="qty-controls">

                <button
                  onClick={() =>
                    updateQty(item._id, item.quantity - 1)
                  }
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQty(item._id, item.quantity + 1)
                  }
                >
                  +
                </button>

              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>

            </div>

          </div>

        ))}

        {cartItems.length > 0 && (

          <div className="cart-total">

            <h2>
              Total: {formatINR(total)}
            </h2>

            <button
              style={{ 
                marginTop: "20px", 
                padding: "12px 24px", 
                backgroundColor: "#ff4757", 
                color: "white", 
                border: "none", 
                borderRadius: "5px", 
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

          </div>

        )}

      </section>

      <Footer />
    </>
  );
}

export default Cart;