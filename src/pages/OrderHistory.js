import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./OrderHistory.css";

function OrderHistory(){

const [orders,setOrders] = useState([]);

const userId = localStorage.getItem("userId");

const navigate = useNavigate();

useEffect(()=>{

const fetchOrders = async ()=>{

try{

const res = await axios.get(
`http://localhost:5000/api/orders/${userId}`
);

/* SHOW ONLY DELIVERED ORDERS */

const deliveredOrders = res.data.filter(
order => order.status === "Delivered"
);

setOrders(deliveredOrders);

}catch(error){

console.error(error);

}

};

fetchOrders();

},[userId]);


const formatINR = v =>
v.toLocaleString("en-IN",{
style:"currency",
currency:"INR"
});


return(

<>
<Header/>

<section className="orders-page">

<h1>Order History</h1>

{orders.length===0 && (

<p className="empty">
No delivered orders yet
</p>

)}

{orders.map(order=>(

<div key={order._id} className="order-card">

<div className="order-header">

<span>
Order ID: {order._id}
</span>

<span className="status delivered">
Delivered
</span>

</div>


<p className="date">

Date: {new Date(order.createdAt).toLocaleDateString()}

</p>


{order.products.map(item=>(

<div key={item._id} className="order-item">

<img
src={item.productId.image}
alt={item.productId.name}
/>

<div className="product-info">

<h4>{item.productId.name}</h4>

<p>Quantity: {item.quantity}</p>

</div>

<div className="price">

{formatINR(item.productId.price * item.quantity)}

</div>

</div>

))}


<div className="order-footer">

<h3>Total: {formatINR(order.total)}</h3>

<button
className="details-btn"
onClick={()=>navigate(`/order/${order._id}`)}
>

View Details

</button>

</div>

</div>

))}

</section>

<Footer/>
</>

);

}

export default OrderHistory;