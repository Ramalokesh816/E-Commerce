import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

import "./Deals.css";

const categoryMap = {
  all: "All",
  fashion: "Fashion",
  electronics: "Electronics",
  groceries: "Groceries",
  home: "Home",
  beauty: "Beauty"
};

function Deals(){

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products,setProducts] = useState([]);
  const [activeCategory,setActiveCategory] = useState("all");

  /* FETCH DEAL PRODUCTS */

  useEffect(()=>{

    const fetchDeals = async()=>{

      try{

        const res = await axios.get(
          "http://localhost:5000/api/products"
        );

        const deals = res.data.filter(
          p => p.discount > 0
        );

        setProducts(deals);

      }catch(error){

        console.error(error);

      }

    };

    fetchDeals();

  },[]);


  /* FILTER BY CATEGORY */

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          p => p.category?.toLowerCase() === activeCategory
        );


  const formatINR = v =>
    v.toLocaleString("en-IN",{
      style:"currency",
      currency:"INR"
    });


  return(
    <>
      <Header/>

      <section className="deals-page">

        <h1>🔥 Deals & Offers</h1>

        {/* CATEGORY FILTER */}

        <div className="deal-categories">

          {Object.keys(categoryMap).map(key => (

            <button
              key={key}
              className={activeCategory===key ? "active" : ""}
              onClick={()=>setActiveCategory(key)}
            >
              {categoryMap[key]}
            </button>

          ))}

        </div>


        {/* DEAL PRODUCTS */}

        <div className="deals-grid">

          {filteredProducts.map(product=>{

            const newPrice =
              product.price -
              (product.price * product.discount / 100);

            return(

              <div
                key={product._id}
                className="deal-card"
                onClick={()=>navigate(`/product/${product._id}`)}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <h4>{product.name}</h4>

                <p className="old-price">
                  {formatINR(product.price)}
                </p>

                <p className="new-price">
                  {formatINR(newPrice)}
                </p>

                <span className="discount">
                  {product.discount}% OFF
                </span>

                <button
                  onClick={(e)=>{
                    e.stopPropagation();
                    addToCart({
                      ...product,
                      price:newPrice
                    });
                  }}
                >
                  Add to Cart
                </button>

              </div>

            )

          })}

        </div>

      </section>

      <Footer/>
    </>
  );

}

export default Deals;