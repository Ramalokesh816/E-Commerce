import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

function Header() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        🛍️ ShopEase
      </div>

      {/* DESKTOP NAV */}
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/deals" onClick={() => setMenuOpen(false)}>Deals</Link>
        <Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
      </nav>

      {/* ACTIONS */}
      <div className="header-actions">
        {user ? (
          <div className="profile-icon" onClick={() => navigate("/profile")}>
            👤
          </div>
        ) : (
          <>
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/register" className="auth-link register">Register</Link>
          </>
        )}

        <Link to="/cart" className="cart-link">
          🛒
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </Link>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>
    </header>
  );
}

export default Header;