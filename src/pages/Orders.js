import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Orders.css";

function Orders(){

const [orders,setOrders] = useState([]);
const [loading,setLoading] = useState(true);

const userId = localStorage.getItem("userId");

const navigate = useNavigate();

const statusSteps = [
"Placed",
"Packed",
"Shipped",
"Out for Delivery",
"Delivered"
];


/* FETCH ORDERS */

useEffect(()=>{

const fetchOrders = async ()=>{

try{

const res = await axios.get(
`http://localhost:5000/api/orders/${userId}`
);

setOrders(res.data);

}catch(error){

console.error(error);

}finally{

setLoading(false);

}

};

/* first load */
fetchOrders();

/* auto refresh every 10 seconds */

const interval = setInterval(()=>{
fetchOrders();
},10000);

return ()=>clearInterval(interval);

},[userId]);

/* CANCEL ORDER */

const cancelOrder = async(orderId,e)=>{

e.stopPropagation();

try{

await axios.delete(
`http://localhost:5000/api/orders/cancel/${orderId}`
);

setOrders(prev =>
prev.filter(order => order._id !== orderId)
);

alert("Order cancelled successfully");

}catch(error){

console.error(error);
alert("Failed to cancel order");

}

};


/* PRICE FORMAT */

const formatINR = value =>
value.toLocaleString("en-IN",{
style:"currency",
currency:"INR"
});


if(loading){
return <p style={{textAlign:"center"}}>Loading orders...</p>;
}


/* ACTIVE ORDERS */

const activeOrders = orders.filter(
order => order.status !== "Delivered"
);


return(

<>
<Header/>

<section className="orders-page">

<h1>My Orders</h1>

{activeOrders.length === 0 && (
<p>No active orders</p>
)}


{activeOrders.map(order=>{

const currentIndex =
statusSteps.indexOf(order.status || "Placed");

const progress =
(currentIndex/(statusSteps.length-1))*100;


return(

<div
key={order._id}
className="order-card"
onClick={()=>navigate(`/order/${order._id}`)}
>

<div className="order-header">

<p>
<b>Order ID:</b> {order._id}
</p>

<p>
Date: {new Date(order.createdAt).toLocaleDateString()}
</p>

</div>


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


<p className="order-total">
Total: {formatINR(order.total)}
</p>


<p className="delivery-date">

Estimated Delivery:

{new Date(
new Date(order.createdAt).getTime()
+ 5*24*60*60*1000
).toLocaleDateString()}

</p>


<div
className="tracker-container"
style={{ "--progress":`${progress}%` }}
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


<div className="tracking-info">

<p>
<b>Courier:</b> {order.courier}
</p>

<p>
<b>Tracking ID:</b> {order.trackingId}
</p>

</div>


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
{new Date(item.date).toLocaleString()}
</span>

</div>

</div>

))}

</div>


{(order.status || "Placed") === "Placed" && (

<div className="order-actions">

<button
className="cancel-btn"
onClick={(e)=>cancelOrder(order._id,e)}
>
Cancel Order
</button>

</div>

)}

</div>

);

})}

</section>

<Footer/>

</>

);

}

export default Orders;