import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Profile.css";

function Profile() {

  const navigate = useNavigate();

  const [userId,setUserId] = useState("");

  useEffect(()=>{

    const storedUserId = localStorage.getItem("userId");

    if(!storedUserId){

      navigate("/login");

    }else{

      setUserId(storedUserId);

    }

  },[navigate]);

  const handleLogout = ()=>{

    localStorage.removeItem("userId");
    navigate("/login");

  };

  return(
    <>
      <Header/>

      <section className="profile-page">

        <div className="profile-header">

          <div className="profile-avatar">U</div>

          <h2>User Profile</h2>

          <p>Welcome to your account</p>

        </div>


        <div className="profile-grid">

          {/* ACCOUNT INFO */}

          <div className="profile-card">

            <h3>Account Info</h3>

            <p><b>User ID:</b></p>

            <p>{userId}</p>

          </div>


          {/* ORDERS PAGE BUTTON */}

          <div className="profile-card">

            <h3>Orders</h3>

            <button
              className="view-orders-btn"
              onClick={()=>navigate("/orders")}
            >
              View My Orders
            </button>

          </div>


          {/* SECURITY */}

          <div className="profile-card">

            <h3>Security</h3>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

      </section>

      <Footer/>
    </>
  );

}

export default Profile;