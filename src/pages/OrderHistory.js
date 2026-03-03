import Header from "../components/Header";
import Footer from "../components/Footer";
import { useOrders } from "../context/OrderContext";
import "./OrderHistory.css";

function OrderHistory() {
  const { orders } = useOrders();

  const formatINR = (v) =>
    v.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR"
    });

  return (
    <>
      <Header />

      <section className="orders-page">
        <h1>My Orders</h1>

        {orders.length === 0 && <p>No orders placed yet.</p>}

        {orders.map(order => (
          <div key={order.id} className="order-card">
            <h3>Order ID: {order.id}</h3>
            <p>Date: {order.date}</p>

            {order.items.map(item => (
              <div key={item.id} className="order-item">
                <span>{item.name} × {item.qty}</span>
                <span>{formatINR(item.price * item.qty)}</span>
              </div>
            ))}

            <h4>Total: {formatINR(order.total)}</h4>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}

export default OrderHistory;