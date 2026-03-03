import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import "./Cart.css";
import "../components/Skeleton.css";


function Cart() {
   const navigate = useNavigate();
  const { cart, removeFromCart, updateQty } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
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

        {/* EMPTY CART */}
        {cart.length === 0 && (
          <div className="empty-cart">
            <h2>Your cart is empty 🛒</h2>
            <p>Start shopping to add items</p>
          </div>
        )}

        {/* CART ITEMS */}
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />

            <div className="cart-details">
              <h4>{item.name}</h4>
              <p className="price">{formatINR(item.price)}</p>

              <div className="qty-controls">
                <button
                  onClick={() =>
                    updateQty(item.id, item.qty - 1)
                  }
                  disabled={item.qty <= 1}
                >
                  −
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() =>
                    updateQty(item.id, item.qty + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
              <button
  style={{ marginTop: "20px" }}
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>
            </div>
          </div>
        ))}

        {/* TOTAL */}
        {cart.length > 0 && (
          <div className="cart-total">
            <h2>Total: {formatINR(total)}</h2>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Cart;