import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Orders.css";

function Orders(){
  const navigate = useNavigate();

  const [orders,setOrders] = useState([]);

  const userId = localStorage.getItem("userId");

  const statusSteps = [
    "Placed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ];


  /* FETCH ORDERS */

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


  /* CANCEL ORDER */

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


  /* PRICE FORMAT */

  const formatINR = value =>
    value.toLocaleString("en-IN",{
      style:"currency",
      currency:"INR"
    });


  return(
    <>
      <Header/>

      <section className="orders-page">

        <h1>My Orders</h1>

        {orders.length === 0 && (
          <p>No orders yet</p>
        )}


        {orders.map(order=>{

          const currentIndex =
            statusSteps.indexOf(order.status || "Placed");

          const progress =
            (currentIndex/(statusSteps.length-1))*100;


          return(

            <div
  key={order._id}
  className="order-card"
  onClick={() => navigate(`/orders/${order._id}`)}
>
              {/* ORDER HEADER */}

              <div className="order-header">

                <p>
                  <b>Order ID:</b> {order._id}
                </p>

                <p>
                  Date: {new Date(order.createdAt)
                    .toLocaleDateString()}
                </p>

              </div>


              {/* PRODUCTS */}

              {order.products.map(item=>(

                <div
                  key={item._id}
                  className="order-product"
                >

                  <img
                    src={item.productId?.image}
                    alt={item.productId?.name}
                  />

                  <div>

                    <p className="product-name">
                      {item.productId?.name}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                  </div>

                </div>

              ))}


              {/* TOTAL */}

              <p className="order-total">
                Total: {formatINR(order.total)}
              </p>


              {/* DELIVERY DATE */}

              <p className="delivery-date">

                Estimated Delivery:

                {new Date(
                  new Date(order.createdAt).getTime()
                  + 5*24*60*60*1000
                ).toLocaleDateString()}

              </p>


              {/* TRACKER */}

              <div
                className="tracker-container"
                style={{
                  "--progress":`${progress}%`
                }}
              >

                {statusSteps.map((step,index)=>(

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

                ))}

              </div>


              {/* TRACKING INFO */}

              <div className="tracking-info">

                <p>
                  <b>Courier:</b> {order.courier}
                </p>

                <p>
                  <b>Tracking ID:</b> {order.trackingId}
                </p>

              </div>


              {/* TIMELINE */}

              <div className="timeline">

                <h4>Delivery Updates</h4>

                {order.timeline?.map((item,index)=>(

                  <div
                    key={index}
                    className="timeline-item"
                  >

                    <div className="timeline-dot"></div>

                    <div>

                      <p>{item.step}</p>

                      <span>
                        {new Date(item.date)
                          .toLocaleString()}
                      </span>

                    </div>

                  </div>

                ))}

              </div>


              {/* CANCEL BUTTON */}

              {(order.status || "Placed") === "Placed" && (

                <div className="order-actions">

                  <button
                    className="cancel-btn"
                    onClick={() =>
                      cancelOrder(order._id)
                    }
                  >
                    Cancel Order
                  </button>

                </div>

              )}

            </div>

          )

        })}

      </section>

      <Footer/>

    </>
  );

}

export default Orders;