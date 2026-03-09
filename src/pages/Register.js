import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Auth.css";

function Register() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(name.trim().length < 3){
      setError("Name must be at least 3 characters");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
      setError("Please enter a valid email address");
      return;
    }

    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

    if(!passwordPattern.test(password)){
      setError(
        "Password must be at least 6 characters and include 1 uppercase letter, 1 number, and 1 special character"
      );
      return;
    }

    try {

      setError("");

      await axios.post(
        "https://e-commerce-1-ifvn.onrender.com/api/users/register",
        {
          name,
          email,
          password
        }
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  return (

    <>
    
    <Header/>

    <div className="auth-container">

      <div className="auth-left">

        <img
          src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a"
          alt="Ecommerce"
        />

      </div>

      <div className="auth-right">

        <div className="auth-card">

        <h2>Create Account</h2>
        <p>Join our marketplace</p>

        {error && (
          <p className="error-text">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

        {/* LOGIN LINK */}

        <div className="auth-switch">
        Already have an account? 
        <Link to="/login"> Login</Link>
        </div>

        </div>

      </div>

    </div>

    <Footer/>

    </>

  );
}

export default Register;