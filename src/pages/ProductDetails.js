import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./ProductDetails.css";

function ProductDetails(){

  const { id } = useParams();
  const navigate = useNavigate();

  const [product,setProduct] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [quantity,setQuantity] = useState(1);

  useEffect(()=>{

    const fetchProduct = async()=>{

      try{

        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setProduct(res.data);

      }catch(err){

        setError("Failed to load product");

      }finally{
        setLoading(false);
      }

    };

    fetchProduct();

  },[id]);

  const formatINR = value =>
    value.toLocaleString("en-IN",{style:"currency",currency:"INR"});

  const finalPrice = product
    ? product.price - (product.price * product.discount)/100
    : 0;

  const addToCart = async()=>{

    const userId = localStorage.getItem("userId");

    if(!userId){
      alert("Please login first");
      navigate("/login");
      return;
    }

    try{

      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          userId,
          productId:id,
          quantity
        }
      );

      alert("Added to cart");

    }catch(error){
      console.error(error);
    }

  };

  if(loading) return <p className="loading">Loading product...</p>;
  if(error) return <p className="error">{error}</p>;

  return(

  <>
  
  <Header/>

  <section className="product-container">

    <div className="product-image">
      <img src={product.image} alt={product.name}/>
    </div>

    <div className="product-info">

      <h1>{product.name}</h1>

      {product.discount > 0 && (
        <p className="discount-badge">
          {product.discount}% OFF
        </p>
      )}

      <div className="price-box">

        {product.discount > 0 && (
          <span className="old-price">
            {formatINR(product.price)}
          </span>
        )}

        <span className="price">
          {formatINR(finalPrice)}
        </span>

      </div>

      <p className="description">
        {product.description}
      </p>

      <div className="quantity">

        <label>Quantity</label>

        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e)=>setQuantity(e.target.value)}
        />

      </div>

      <button
        className="add-cart-btn"
        onClick={addToCart}
      >
        Add to Cart
      </button>

    </div>

  </section>

  <Footer/>

  </>

  );

}

export default ProductDetails;