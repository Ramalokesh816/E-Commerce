import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import "./Shop.css";

/* CATEGORY LABELS */
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
  const { cart, addToCart } = useCart();

  /* PRODUCTS */
  const products = [
    { id: 1, name: "Casual Outfit", price: 2499, category: "fashion", image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" },
    { id: 2, name: "Sneakers", price: 3199, category: "fashion", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },

    { id: 3, name: "Smartphone", price: 15999, category: "electronics", image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg" },
    { id: 4, name: "Wireless Headphones", price: 2999, category: "electronics", image: "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg" },

    { id: 5, name: "Fresh Vegetables", price: 199, category: "groceries", image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg" },
    { id: 6, name: "Rice Bag (5kg)", price: 649, category: "groceries", image: "https://images.pexels.com/photos/4110255/pexels-photo-4110255.jpeg" },

    { id: 7, name: "Sofa Set", price: 28999, category: "home", image: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg" },
    { id: 8, name: "Table Lamp", price: 1299, category: "home", image: "https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg" },

    { id: 9, name: "Beauty Kit", price: 1899, category: "beauty", image: "https://images.pexels.com/photos/3373744/pexels-photo-3373744.jpeg" }
  ];

  /* STATE */
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("");

  /* SYNC CATEGORY FROM URL */
  useEffect(() => {
    if (category && categoryMap[category]) {
      setActiveCategory(category);
    } else {
      setActiveCategory("all");
    }
  }, [category]);

  /* DEBOUNCED SEARCH */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  /* FILTER BY CATEGORY */
  let filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(p => p.category === activeCategory);

  /* FILTER BY SEARCH */
  filteredProducts = filteredProducts.filter(p =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  /* SORT */
  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }
  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  /* INR FORMATTER */
  const formatINR = (value) =>
    value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR"
    });

  return (
    <>
      <Header />

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
      <section className="shop-controls sticky-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <span className="clear-icon" onClick={() => setSearch("")}>
              ✕
            </span>
          )}
        </div>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </section>

      {/* PRODUCTS */}
      <section className="shop-products">
        {filteredProducts.map(product => {
          const isInCart = cart.some(item => item.id === product.id);

          return (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
              />

              <h4>{product.name}</h4>
              <p className="price">{formatINR(product.price)}</p>

              <button
                className={isInCart ? "added" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isInCart) addToCart(product);
                }}
              >
                {isInCart ? "✓ Added" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </section>

      <Footer />
    </>
  );
}

export default Shop;