import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./OrderHistory.css";

function OrderHistory() {

  const [orders,setOrders] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(()=>{

    const fetchOrders = async ()=>{

      try{

        const res = await axios.get(
          `http://localhost:5000/api/orders/${userId}`
        );

        setOrders(res.data);

      }catch(error){

        console.error(error);

      }

    };

    fetchOrders();

  },[userId]);

  const formatINR = (v)=>
    v.toLocaleString("en-IN",{style:"currency",currency:"INR"});

  return(
    <>
      <Header/>

      <section className="orders-page">

        <h1>My Orders</h1>

        {orders.length===0 && (
          <p>No orders placed yet</p>
        )}

        {orders.map(order=>(

          <div key={order._id} className="order-card">

            <h3>Order ID: {order._id}</h3>

            {order.products.map(item=>(

              <div key={item._id} className="order-item">

                <span>
                  {item.productId.name} × {item.quantity}
                </span>

                <span>
                  {formatINR(item.productId.price * item.quantity)}
                </span>

              </div>

            ))}

            <h4>Total: {formatINR(order.total)}</h4>

          </div>

        ))}

      </section>

      <Footer/>
    </>
  );

}

export default OrderHistory;