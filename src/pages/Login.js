import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Updated to use Context

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login function from Context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call to your BACKEND
      const res = await axios.post(
        "https://e-commerce-1-ifvn.onrender.com/api/users/login",
        { email, password }
      );

      console.log("LOGIN RESPONSE:", res.data);

      // 1. Update AuthContext state (this fixes the Header)
      login(res.data.user);

      // 2. Store individual ID if needed for other features
      localStorage.setItem("userId", res.data.user._id);

      alert("Login successful");
      navigate("/"); // Redirect to Home

    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        {/* LEFT IMAGE */}
        <div className="auth-left">
          <img
            src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a"
            alt="Ecommerce"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="auth-right">
          <div className="auth-card">
            <h2>Login</h2>
            <p>Access your account</p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
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

              <button type="submit">Login</button>
            </form>

            <div className="auth-switch">
              Don't have an account?
              <Link to="/register"> Register</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;