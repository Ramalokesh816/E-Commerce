import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <section className="order-success">
        <div className="success-card">
          <h1>🎉 Order Placed Successfully!</h1>
          <p>Your order has been confirmed and will be delivered soon.</p>

          <button onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default OrderSuccess;