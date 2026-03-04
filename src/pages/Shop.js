import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Shop.css";

const categoryMap = {
  all: "All",
  fashion: "Fashion",
  electronics: "Electronics",
  groceries: "Groceries",
  home: "Home",
  beauty: "Beauty"
};

function Shop() {

  const navigate = useNavigate();
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  /* FETCH PRODUCTS */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/products"
        );

        setProducts(res.data);

      } catch (error) {

        console.error(error);

      }

    };

    fetchProducts();

  }, []);

  useEffect(() => {

    if (category && categoryMap[category]) {
      setActiveCategory(category);
    } else {
      setActiveCategory("all");
    }

  }, [category]);

  /* FILTER */

  let filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          p => p.category?.toLowerCase() === activeCategory
        );

  filteredProducts = filteredProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort((a,b)=>a.price-b.price);
  }

  if (sort === "high") {
    filteredProducts = [...filteredProducts].sort((a,b)=>b.price-a.price);
  }

  const formatINR = value =>
    value.toLocaleString("en-IN",{style:"currency",currency:"INR"});

  /* ADD TO CART */

  const addToCart = async(productId)=>{

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
          userId:userId,
          productId:productId,
          quantity:1
        }
      );

      alert("Product added to cart");

    }catch(error){

      console.error(error);

    }

  };

  return (
    <>
      <Header/>

      <section className="shop-hero">
        <h1>Shop Products</h1>
        <p>Search, filter & sort products easily</p>
      </section>

      <section className="filters">

        {Object.keys(categoryMap).map(key => (

          <button
            key={key}
            className={activeCategory===key?"active":""}
            onClick={()=>{

              setActiveCategory(key);
              navigate(key==="all"?"/shop":`/shop/${key}`);

            }}
          >
            {categoryMap[key]}
          </button>

        ))}

      </section>

      <section className="shop-controls">

        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={e=>setSearch(e.target.value)}
        />

        <select
          value={sort}
          onChange={e=>setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="low">Price Low</option>
          <option value="high">Price High</option>
        </select>

      </section>

      <section className="shop-products">

        {filteredProducts.map(product => (

          <div key={product._id} className="product-card">

            <img src={product.image} alt={product.name}/>

            <h4>{product.name}</h4>

            <p className="price">{formatINR(product.price)}</p>

            <button
              onClick={()=>addToCart(product._id)}
            >
              Add to Cart
            </button>

          </div>

        ))}

      </section>

      <Footer/>

    </>
  );

}

export default Shop;