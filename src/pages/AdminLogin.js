import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      localStorage.setItem("adminToken", res.data.token);

      navigate("/admin/dashboard");

    } catch (error) {
      alert("Invalid Login");
    }
  };

  return (

    <div >

      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

      </form>

    </div>
  );
}

export default AdminLogin;