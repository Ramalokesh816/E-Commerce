import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Register() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    /* NAME VALIDATION */
    if(name.trim().length < 3){
      setError("Name must be at least 3 characters");
      return;
    }

    /* EMAIL VALIDATION */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
      setError("Please enter a valid email address");
      return;
    }

    /* PASSWORD VALIDATION */
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
        "http://localhost:5000/api/users/register",
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

    <div className="auth-container">

      <div className="auth-left">
        <img
          src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc"
          alt="Supermarket"
        />
      </div>

      <div className="auth-right">

        <h2>Create Account</h2>
        <p>Join our marketplace</p>

        {error && (
          <p style={{color:"red",marginBottom:"10px"}}>
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

      </div>

    </div>

  );
}

export default Register;