import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user } = useAuth(); 
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        🛍️ ShopEase
      </div>

      {/* NAVIGATION - Common for both states */}
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
        <Link to="/deals" onClick={() => setMenuOpen(false)}>Deals</Link>
      </nav>

      {/* RIGHT SIDE ACTIONS */}
      <div className="header-actions">
        {user ? (
          <>
            {/* LOGGED IN VIEW: Only Profile and Cart */}
            <div 
              className="profile-icon" 
              onClick={() => navigate("/profile")}
              title="View Profile"
            >
              👤
            </div>

            <div 
              className="cart-link" 
              onClick={() => navigate("/cart")}
            >
              🛒 
              {cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </div>
          </>
        ) : (
          <>
            {/* LOGGED OUT VIEW: Only Login and Register */}
            <Link to="/login" className="auth-link">
              Login
            </Link>
            <Link to="/register" className="auth-link register">
              Register
            </Link>
          </>
        )}

        {/* HAMBURGER MENU FOR MOBILE */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>
    </header>
  );
}

export default Header;