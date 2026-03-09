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
`https://e-commerce-1-ifvn.onrender.com/api/orders/details/${id}`
);

setOrder(res.data);

}catch(err){
console.log(err);
}

};

fetchOrder();

},[id]);

if(!order) return <p className="loading">Loading...</p>;

const currentIndex =
statusSteps.indexOf(order.status || "Placed");

const progress =
(currentIndex/(statusSteps.length-1))*100;

const orderDate = new Date(order.createdAt);

const deliveryDate = new Date(orderDate);
deliveryDate.setDate(orderDate.getDate()+5);

const timelineDates={

Placed:new Date(orderDate),

Packed:new Date(orderDate),

Shipped:new Date(orderDate),

"Out for Delivery":new Date(orderDate),

Delivered:new Date(orderDate)

};

timelineDates.Packed.setDate(orderDate.getDate()+2);
timelineDates.Shipped.setDate(orderDate.getDate()+3);
timelineDates["Out for Delivery"].setDate(orderDate.getDate()+4);
timelineDates.Delivered.setDate(orderDate.getDate()+5);

const formatINR=value=>
value.toLocaleString("en-IN",{
style:"currency",
currency:"INR"
});

return(

<>
<Header/>

<section className="order-details">

<h1>Order Tracking</h1>

<div className="details-card">

<div className="order-meta">

<p><b>Order ID:</b> {order._id}</p>
<p><b>Date:</b> {orderDate.toLocaleDateString()}</p>
<p><b>Estimated Delivery:</b> {deliveryDate.toLocaleDateString()}</p>

</div>

{/* TRACKER */}

<div className="tracker">

<div className="road"></div>

<div
className="progress"
style={{width:`${progress}%`}}
></div>

<div
className="truck-container"
style={{left:`${progress}%`}}
>

<div className="truck">

<div className="truck-body"></div>

<div className="wheel wheel1"></div>
<div className="wheel wheel2"></div>

</div>

</div>

<div className="steps">

{statusSteps.map((step,index)=>(

<div
key={step}
className={`step ${index<=currentIndex ? "active" : ""}`}
>

<div className="circle"></div>

<p>{step}</p>

<span>
{timelineDates[step].toLocaleDateString()}
</span>

</div>

))}

</div>

</div>


{/* PRODUCTS */}

<div className="product-section">

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

</div>

</div>

</section>

<Footer/>

</>

);

}

export default OrderDetails;