import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Integrated
import "./Auth.css";

function Login(){

  const navigate = useNavigate();
  const { login } = useAuth(); // Hook into the login function

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      console.log("LOGIN RESPONSE:", res.data);

      /* UPDATE GLOBAL STATE */
      login(res.data.user);

      /* SAVE USER ID FOR API CALLS */
      const userId = res.data.user._id;

      localStorage.setItem("userId", userId);

      console.log("Saved userId:", userId);

      alert("Login successful");

      navigate("/");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return(

    <div className="auth-container">

      <div className="auth-left">
        <img
          src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc"
          alt=""
        />
      </div>

      <div className="auth-right">

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

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

          <button type="submit">Login</button>

        </form>

        <Link to="/register">Create Account</Link>

      </div>

    </div>

  );

}

export default Login;