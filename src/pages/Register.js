import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration successful (frontend demo)");
    navigate("/login");
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

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <button type="submit">Register</button>
        </form>

        <div className="auth-links">
          <span onClick={() => navigate("/login")}>
            Already have an account?
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;