import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // Integrated
import "./Header.css";

function Header() {

  const navigate = useNavigate();
  const { cart } = useCart();
  const { user } = useAuth(); // Using user from Context instead of raw localStorage

  const [menuOpen, setMenuOpen] = useState(false);

  /* THE LOGIC: If user exists in Context, show Profile/Cart. Otherwise, show Login/Register */

  return (
    <header className="header">

      {/* LOGO */}
      <div
        className="logo"
        onClick={() => navigate("/")}
      >
        🛍️ ShopEase
      </div>

      {/* NAVIGATION */}
      <nav className={`nav ${menuOpen ? "open" : ""}`}>

        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/shop" onClick={() => setMenuOpen(false)}>
          Shop
        </Link>

        <Link to="/categories" onClick={() => setMenuOpen(false)}>
          Categories
        </Link>

        <Link to="/deals" onClick={() => setMenuOpen(false)}>
          Deals
        </Link>

      </nav>

      {/* RIGHT SIDE */}
      <div className="header-actions">

        {user ? (

          <>
            {/* PROFILE */}
            <div
              className="profile-icon"
              onClick={() => navigate("/profile")}
            >
              👤 
            </div>

            {/* CART */}
            <div
              className="cart-link"
              onClick={() => navigate("/cart")}
            >
              🛒 
              {cart.length > 0 && (
                <span className="cart-badge">
                  {cart.length}
                </span>
              )}
            </div>
          </>

        ) : (

          <>
            <Link
              to="/login"
              className="auth-link"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="auth-link register"
            >
              Register
            </Link>
          </>

        )}

        {/* HAMBURGER */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

      </div>

    </header>
  );
}

export default Header;