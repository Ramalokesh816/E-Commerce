import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Profile.css";

function Profile() {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();

  // redirect safety
  if (!user) {
    navigate("/login");
    return null;
  }

  // get saved address
  const address = JSON.parse(localStorage.getItem("address"));

  return (
    <>
      <Header />

      <section className="profile-page">
        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h2>{user.name || "User"}</h2>
          <p>{user.email}</p>
        </div>

        {/* GRID */}
        <div className="profile-grid">
          {/* ACCOUNT INFO */}
          <div className="profile-card">
            <h3>Account Info</h3>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone:</b> {user.phone || "Not added"}</p>
          </div>

          {/* ORDERS */}
          <div className="profile-card">
            <h3>Orders</h3>
            <p>
              {orders.length > 0
                ? `You have ${orders.length} order(s)`
                : "No orders placed yet"}
            </p>

            {orders.length > 0 && (
              <button onClick={() => navigate("/orders")}>
                View Orders
              </button>
            )}
          </div>

          {/* ADDRESS */}
          <div className="profile-card">
            <h3>Saved Address</h3>

            {address ? (
              <p>
                <b>{address.name}</b><br />
                {address.street}, {address.city}<br />
                {address.pincode}<br />
                📞 {address.phone}
              </p>
            ) : (
              <p>No address saved yet</p>
            )}
          </div>

          {/* SECURITY */}
          <div className="profile-card">
            <h3>Security</h3>
            <button
              className="logout-btn"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Profile;