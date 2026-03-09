import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Update context - This makes Profile/Cart appear in Header
      login(res.data.user);
      
      // Store userId for other backend queries
      localStorage.setItem("userId", res.data.user._id);

      alert("Login successful");
      navigate("/"); 
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="auth-left">
          <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a" alt="Ecommerce" />
        </div>
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
              Don't have an account? <Link to="/register"> Register</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;