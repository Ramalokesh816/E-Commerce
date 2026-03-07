import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Profile.css";

function Profile(){

  const navigate = useNavigate();

  const [userId,setUserId] = useState("");
  const [userName,setUserName] = useState("");
  const [profileImage,setProfileImage] = useState("");

  useEffect(()=>{

    const storedUserId = localStorage.getItem("userId");

    if(!storedUserId){

      navigate("/login");

    }else{

      setUserId(storedUserId);

      fetchUser(storedUserId);

    }

  },[navigate]);


  /* FETCH USER */

  const fetchUser = async(id)=>{

    try{

      const res = await axios.get(
        `http://localhost:5000/api/users/${id}`
      );

      setUserName(res.data.name);
      setProfileImage(res.data.profileImage);

    }catch(error){

      console.log(error);

    }

  };


  /* IMAGE UPLOAD */

  const handleImageChange = (e)=>{

    const file = e.target.files[0];

    if(file){

      const reader = new FileReader();

      reader.onloadend = async()=>{

        const base64Image = reader.result;

        try{

          const res = await axios.put(
            `http://localhost:5000/api/users/profile-image/${userId}`,
            { image: base64Image }
          );

          setProfileImage(res.data.profileImage);

        }catch(error){

          console.log(error);

        }

      };

      reader.readAsDataURL(file);

    }

  };


  const handleLogout = ()=>{

    localStorage.removeItem("userId");

    navigate("/login");

  };


  return(
    <>
      <Header/>

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
              <span>{userName.charAt(0)}</span>
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

          <div className="profile-card">

            <h3>Account Info</h3>

            <p><b>Name:</b></p>

            <p>{userName}</p>

          </div>


          <div className="profile-card">

            <h3>Orders</h3>

            <button
              className="view-orders-btn"
              onClick={()=>navigate("/orders")}
            >
              View My Orders
            </button>
            <button
className="orders-btn"
onClick={() => navigate("/order-history")}
>
Order History
</button>

          </div>


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