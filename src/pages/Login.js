import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

if (!emailRegex.test(email)) {
  alert("Enter a valid email address");
  return;
}

if (!passwordRegex.test(password)) {
  alert(
    "Password must be at least 8 characters, include 1 uppercase letter and 1 number"
  );
  return;
}

    // 🔐 DEMO LOGIN (replace with backend later)
    login({
      name: "Rama Lokesh",
      email: email,
      phone: "+91 9876543210"
    });

    // ✅ Redirect to Home after login
    navigate("/");
  };

  return (
    <div className="auth-container">
      {/* LEFT SIDE IMAGE */}
      <div className="auth-left">
        <img
          src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc"
          alt="Supermarket"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="auth-right">
        <h2>Welcome Back!</h2>
        <p>Sign in to continue shopping</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>
        </form>

        <div className="auth-links">
          <span>
            Don’t have an account?{" "}
            <Link to="/register">Create one</Link>
          </span>
        </div>

        <div className="social-login">
          <button className="google">Sign in with Google</button>
          <button className="facebook">Sign in with Facebook</button>
        </div>
      </div>
    </div>
  );
}

export default Login;