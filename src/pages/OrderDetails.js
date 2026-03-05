import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./OrderDetails.css";

function OrderDetails(){

  const { id } = useParams();

  const [order,setOrder] = useState(null);

  const statusSteps=[
    "Placed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ];

  useEffect(()=>{

    const fetchOrder = async()=>{

      try{

        const res = await axios.get(
          `http://localhost:5000/api/orders/details/${id}`
        );

        setOrder(res.data);

      }catch(error){

        console.error(error);

      }

    };

    fetchOrder();

  },[id]);


  if(!order) return <p>Loading...</p>;


  const currentIndex =
    statusSteps.indexOf(order.status || "Placed");


  const progress =
    (currentIndex/(statusSteps.length-1))*100;


  const formatINR = value =>
    value.toLocaleString("en-IN",{
      style:"currency",
      currency:"INR"
    });


  return(
    <>
      <Header/>

      <section className="order-details">

        <h1>Order Details</h1>

        <div className="details-card">

          <p><b>Order ID:</b> {order._id}</p>

          <p>
            Date:
            {new Date(order.createdAt)
            .toLocaleDateString()}
          </p>


          {/* TRACKER */}

          <div
            className="tracker-container"
            style={{"--progress":`${progress}%`}}
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

                <h4>{item.productId?.name}</h4>

                <p>Quantity: {item.quantity}</p>

              </div>

            </div>

          ))}


          <h3>Total: {formatINR(order.total)}</h3>


          {/* ADDRESS */}

          {/* Wrap these sections inside your details-card */}
<div className="summary-grid">
  <div className="address">
    <h4>Shipping Address</h4>
    <p>{order.address.name}</p>
    <p>{order.address.street}</p>
    <p>{order.address.city}, {order.address.pincode}</p>
    <p>{order.address.phone}</p>
  </div>

  <div className="tracking-info">
    <p><b>Courier:</b> {order.courier}</p>
    <p><b>Tracking ID:</b> {order.trackingId}</p>
  </div>

  <div className="total-section">
    <h3>Total: {formatINR(order.total)}</h3>
  </div>
</div>


          {/* COURIER */}

          <div className="tracking-info">

            <p><b>Courier:</b> {order.courier}</p>

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

        </div>

      </section>

      <Footer/>
    </>
  );
}

export default OrderDetails;