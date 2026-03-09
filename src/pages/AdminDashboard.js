import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchProducts();

  }, [navigate]);


  const fetchProducts = async () => {

    try {

      const res = await axios.get("http://localhost:5000/api/products");

      setProducts(res.data);

    } catch (error) {

      console.error(error);

    }

  };


  const deleteProduct = async (id) => {

    try {

      await axios.delete(`http://localhost:5000/api/products/${id}`);

      fetchProducts();

    } catch (error) {

      console.error(error);

    }

  };


  return (

    <>
      <Header/>

      <section className="admin-dashboard">

        <div className="dashboard-container">

          <h2>Admin Dashboard</h2>

          <button
            className="add-product-btn"
            onClick={() => navigate("/admin/add-product")}
          >
            Add Product
          </button>

          <div className="table-container">

            <table className="product-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {products.map(product => (

                  <tr key={product._id}>

                    <td>{product.name}</td>

                    <td>₹{product.price}</td>

                    <td>{product.category}</td>

                    <td>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/admin/edit-product/${product._id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>

      <Footer/>
    </>
  );
}

export default AdminDashboard;