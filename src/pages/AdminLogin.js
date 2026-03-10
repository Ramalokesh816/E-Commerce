import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./AdminLogin.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://e-commerce-1-ifvn.onrender.com/api/admin/login",
        { email, password }
      );

      localStorage.setItem("adminToken", res.data.token);

      navigate("/admin/dashboard");

    } catch (error) {

      alert(error.response?.data?.message || "Login Failed");

    }

  };

  return (

    <>
      <Header/>

      <section className="admin-login-page">

        <div className="admin-login-card">

          <h2>Admin Login</h2>

          <form onSubmit={handleLogin}>

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
              Login
            </button>

          </form>

        </div>

      </section>

      <Footer/>
    </>
  );
}

export default AdminLogin;