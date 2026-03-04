import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Categories.css";

function Categories() {

  const navigate = useNavigate();

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="category-hero">
        <h1>Shop by Category</h1>
        <p>Explore products across all categories</p>
      </section>

      {/* CATEGORY GRID */}

      <section className="category-section">

        <div
          className="category-card"
          onClick={() => navigate("/shop/fashion")}
        >
          <img
            src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg"
            alt="Fashion"
          />
          <h3>Fashion</h3>
        </div>

        <div
          className="category-card"
          onClick={() => navigate("/shop/electronics")}
        >
          <img
            src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg"
            alt="Electronics"
          />
          <h3>Electronics</h3>
        </div>

        <div
          className="category-card"
          onClick={() => navigate("/shop/groceries")}
        >
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="Groceries"
          />
          <h3>Groceries</h3>
        </div>

        <div
          className="category-card"
          onClick={() => navigate("/shop/home")}
        >
          <img
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
            alt="Home"
          />
          <h3>Home & Living</h3>
        </div>

        <div
          className="category-card"
          onClick={() => navigate("/shop/beauty")}
        >
          <img
            src="https://images.pexels.com/photos/3373744/pexels-photo-3373744.jpeg"
            alt="Beauty"
          />
          <h3>Beauty</h3>
        </div>

      </section>

      <Footer />
    </>
  );

}

export default Categories;