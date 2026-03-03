import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero-new">
        <div className="hero-left">
          <span className="tag">ALL-IN-ONE MARKETPLACE</span>
          <h1>
            Shop Everything <br /> You Need, One Place
          </h1>
          <p>
            Fashion, Electronics, Groceries, Home & more — at the best prices.
          </p>
          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/shop")}
            >
              Shop Now
            </button>
            <button
              className="secondary-btn"
              onClick={() => navigate("/categories")}
            >
              Explore Categories
            </button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg"
            alt="shopping"
          />
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="trust">
        <div>🚚 Fast Delivery</div>
        <div>🔒 Secure Payments</div>
        <div>⭐ 10k+ Happy Customers</div>
        <div>📦 Easy Returns</div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card"><img src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" alt="" /><p>Fashion</p></div>
          <div className="category-card"><img src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg" alt="" /><p>Electronics</p></div>
          <div className="category-card"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e" alt="" /><p>Groceries</p></div>
          <div className="category-card"><img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7" alt="" /><p>Home & Living</p></div>
          <div className="category-card"><img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" alt="" /><p>Beauty</p></div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="" /><p>Smart Watch</p><span>₹3,999</span></div>
          <div className="product-card"><img src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb" alt="" /><p>Casual Sneakers</p><span>₹3,199</span></div>
          <div className="product-card"><img src="https://audiomaxx.in/cdn/shop/collections/headphone_audiomaxx.jpg?v=1700377356" alt="" /><p>Headphones</p><span>₹2,499</span></div>
          <div className="product-card"><img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952" alt="" /><p>Kitchen Mixer</p><span>₹5,999</span></div>
        </div>
      </section>

      {/* DEAL BANNER */}
      <section className="deal">
        <h2>🔥 Mega Sale – Up to 60% Off</h2>
        <p>Limited time offers across all categories</p>
        <button onClick={() => navigate("/deals")}>
          Grab Deals
        </button>
      </section>

      <Footer />
    </>
  );
}

export default Home;