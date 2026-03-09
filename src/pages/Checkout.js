import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Checkout.css";
function Checkout() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: ""
  });

  /* HANDLE INPUT CHANGE */

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  /* PLACE ORDER */

  const handleSubmit = async (e) => {

    e.preventDefault();

    const userId = localStorage.getItem("userId");

    try {

      /* GET CART */

      const cartRes = await axios.get(
        `https://e-commerce-1-ifvn.onrender.com/api/cart/${userId}`
      );

      const cart = cartRes.data;

      if (cart.length === 0) {

        alert("Cart is empty");
        return;

      }

      /* CREATE PRODUCTS ARRAY */

      const products = cart.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      }));

      /* CALCULATE TOTAL */

      const total = cart.reduce(
        (sum, item) =>
          sum + item.productId.price * item.quantity,
        0
      );

      /* PLACE ORDER */

      await axios.post(
        "https://e-commerce-1-ifvn.onrender.com/api/orders/place",
        {
          userId,
          products,
          total,
          address: form
        }
      );

      /* CLEAR CART */

      await axios.delete(
        `https://e-commerce-1-ifvn.onrender.com/api/cart/clear/${userId}`
      );

      /* REDIRECT TO SUCCESS PAGE */

      navigate("/order-success");

    } catch (error) {

      console.error(error);
      alert("Error placing order");

    }

  };


  return (
    <>
      <Header />

      <section className="checkout-page">
  <div className="checkout-container">

        <h2>Checkout</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            name="street"
            placeholder="Street"
            value={form.street}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
          />

          <br /><br />

          <button type="submit" className="checkout-btn">
  Confirm Order
</button>

        </form>

      </div>
      </section>
      <Footer />
    </>
  );
}

export default Checkout;