import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import "./Checkout.css";

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const { addOrder } = useOrders();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: ""
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const formatINR = (v) =>
    v.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR"
    });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
  const { name, phone, street, city, pincode } = address;

  if (!name || !phone || !street || !city || !pincode) {
    alert("Please fill all address fields");
    return;
  }

  addOrder({
    id: Date.now(),
    items: cart,
    address,
    total,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("address", JSON.stringify(address));
  clearCart();
  navigate("/order-success");
};
  return (
    <>
      <Header />

      <section className="checkout-page">
        <h1>Checkout</h1>

        <div className="checkout-grid">
          {/* ADDRESS */}
          <div className="checkout-card">
            <h3>Delivery Address</h3>

            <input name="name" placeholder="Full Name" onChange={handleChange} />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} />
            <input name="street" placeholder="Street Address" onChange={handleChange} />
            <input name="city" placeholder="City" onChange={handleChange} />
            <input name="pincode" placeholder="Pincode" onChange={handleChange} />
          </div>

          {/* ORDER SUMMARY */}
          <div className="checkout-card">
            <h3>Order Summary</h3>

            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} × {item.qty}</span>
                <span>{formatINR(item.price * item.qty)}</span>
              </div>
            ))}

            <hr />
            <h2>Total: {formatINR(total)}</h2>

            <button onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Checkout;