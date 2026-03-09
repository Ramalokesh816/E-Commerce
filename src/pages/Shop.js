import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

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
  const { fetchCart } = useCart(); // Refreshes the cart badge
  const { user } = useAuth();      // Gets user info

  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [addedProducts, setAddedProducts] = useState({});

  /* FETCH PRODUCTS */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  /* CATEGORY CHANGE */
  useEffect(() => {
    if (category && categoryMap[category]) {
      setActiveCategory(category);
    } else {
      setActiveCategory("all");
    }
  }, [category]);

  /* FILTER PRODUCTS */
  let filteredProducts = activeCategory === "all"
    ? products
    : products.filter(p => p.category?.toLowerCase() === activeCategory);

  filteredProducts = filteredProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  /* SORT PRODUCTS */
  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }
  if (sort === "high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  /* FORMAT PRICE */
  const formatINR = value =>
    value.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  /* ADD TO CART */
  const addToCart = async (productId) => {
    const userId = user?._id || localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        userId: userId,
        productId: productId,
        quantity: 1
      });

      // Update button visual state
      setAddedProducts(prev => ({ ...prev, [productId]: true }));

      // Refresh global cart state so Header badge updates
      if (fetchCart) {
        fetchCart(userId);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Could not add to cart. Please try again.");
    }
  };

  /* CARD CLICK NAVIGATION */
  const handleCardClick = (e, productId) => {
    // Only navigate if the user clicked the card itself, not the button
    if (e.target.tagName === "BUTTON") {
      return;
    }
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <Header />

      <div className="shop-page">
        {/* HERO */}
        <section className="shop-hero">
          <h1>Shop Products</h1>
          <p>Search, filter & sort products easily</p>
        </section>

        {/* CATEGORY FILTER */}
        <section className="filters">
          {Object.keys(categoryMap).map(key => (
            <button
              key={key}
              className={activeCategory === key ? "active" : ""}
              onClick={() => {
                setActiveCategory(key);
                navigate(key === "all" ? "/shop" : `/shop/${key}`);
              }}
            >
              {categoryMap[key]}
            </button>
          ))}
        </section>

        {/* SEARCH + SORT */}
        <section className="shop-controls">
          <input
            type="text"
            placeholder="Search products"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="low">Price Low</option>
            <option value="high">Price High</option>
          </select>
        </section>

        {/* PRODUCTS */}
        <section className="shop-products">
          {filteredProducts.map(product => (
            <div
              key={product._id}
              className="product-card"
              onClick={(e) => handleCardClick(e, product._id)}
            >
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p className="price">{formatINR(product.price)}</p>

              <button
                className={`cart-btn ${addedProducts[product._id] ? "added" : ""}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevents card click
                  addToCart(product._id);
                }}
                disabled={addedProducts[product._id]}
              >
                {addedProducts[product._id] ? "✓ Added" : "Add to Cart"}
              </button>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Shop;