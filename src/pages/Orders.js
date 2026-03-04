import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Orders.css";

function Orders(){

  const [orders,setOrders] = useState([]);

  const userId = localStorage.getItem("userId");

  const statusSteps = [
    "Placed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ];

  useEffect(()=>{

    const fetchOrders = async()=>{

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


  const cancelOrder = async(orderId)=>{

    try{

      await axios.delete(
        `http://localhost:5000/api/orders/cancel/${orderId}`
      );

      setOrders(
        orders.filter(order => order._id !== orderId)
      );

      alert("Order cancelled");

    }catch(error){

      console.error(error);

    }

  };


  const formatINR = value =>
    value.toLocaleString("en-IN",{style:"currency",currency:"INR"});


  return(
    <>
      <Header/>

      <section className="orders-page">

        <h1>My Orders</h1>

        {orders.length === 0 && (
          <p>No orders yet</p>
        )}

        {orders.map(order=>(

          <div key={order._id} className="order-card">

            <div className="order-header">

              <p><b>Order ID:</b> {order._id}</p>

              <p>
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>

            </div>


            {order.products.map(item=>(

              <div key={item._id} className="order-product">

                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                />

                <div>

                  <p className="product-name">
                    {item.productId?.name}
                  </p>

                  <p>Quantity: {item.quantity}</p>

                </div>

              </div>

            ))}


            <p className="order-total">
              Total: {formatINR(order.total)}
            </p>


            <p className="delivery-date">
              Estimated Delivery: {" "}
              {new Date(
                new Date(order.createdAt).getTime() + 5*24*60*60*1000
              ).toLocaleDateString()}
            </p>


            {/* STATUS TRACKER */}

            <div className="order-tracker">

              {statusSteps.map((step,index)=>{

                const currentIndex =
                  statusSteps.indexOf(order.status || "Placed");

                return(

                  <div
                    key={step}
                    className={
                      index <= currentIndex
                        ? "tracker-step active"
                        : "tracker-step"
                    }
                  >

                    <div className="circle"></div>

                    <p>{step}</p>

                  </div>

                );

              })}

            </div>


            {/* CANCEL BUTTON */}

            <div className="order-actions">

              {order.status === "Placed" && (

                <button
                  className="cancel-btn"
                  onClick={()=>cancelOrder(order._id)}
                >
                  Cancel Order
                </button>

              )}

            </div>

          </div>

        ))}

      </section>

      <Footer/>

    </>
  );

}

export default Orders;