import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import Auth Context

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Destructure logout function

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      navigate("/login");
    } else {
      setUserId(storedUserId);
      fetchUser(storedUserId);
    }
  }, [navigate]);

  /* FETCH USER */
  const fetchUser = async (id) => {
    try {
      const res = await axios.get(`https://e-commerce-1-ifvn.onrender.com/api/users/${id}`);
      setUserName(res.data.name);
      setProfileImage(res.data.profileImage);
    } catch (error) {
      console.log(error);
    }
  };

  /* IMAGE UPLOAD */
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Image = reader.result;

        try {
          const res = await axios.put(
            `https://e-commerce-1-ifvn.onrender.com/api/users/profile-image/${userId}`,
            { image: base64Image }
          );

          setProfileImage(res.data.profileImage);
        } catch (error) {
          console.log(error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  /* UPDATED LOGOUT LOGIC */
  const handleLogout = () => {
    // 1. Call context logout (clears 'user' state and 'user' localStorage)
    logout(); 
    
    // 2. Clear the specific userId key
    localStorage.removeItem("userId"); 

    // 3. Redirect to login
    navigate("/login");
  };

  return (
    <>
      <Header />

      <section className="profile-page">
        <div className="profile-header">
          <label className="profile-avatar">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="profile-img"
              />
            ) : (
              <span>{userName ? userName.charAt(0) : "U"}</span>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>

          <h2>{userName}</h2>
          <p>Welcome to your account</p>
        </div>

        <div className="profile-grid">
          {/* ACCOUNT INFO */}
          <div className="profile-card">
            <h3>Account Info</h3>
            <p><b>Name:</b></p>
            <p>{userName}</p>
          </div>

          {/* ACTIVE ORDERS */}
          <div className="profile-card">
            <h3>Orders</h3>
            <button
              className="view-orders-btn"
              onClick={() => navigate("/Orders")}
            >
              View My Orders
            </button>
          </div>

          {/* ORDER HISTORY */}
          <div className="profile-card">
            <h3>Order History</h3>
            <button
              className="view-orders-btn"
              onClick={() => navigate("/order-history")}
            >
              View Delivered Orders
            </button>
          </div>

          {/* SECURITY - Updated Logout Button */}
          <div className="profile-card">
            <h3>Security</h3>
            <button
              className="logout-btn"
              onClick={handleLogout}
              style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer", width: "100%", fontWeight: "bold" }}
            >
              Logout from Account
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Profile;