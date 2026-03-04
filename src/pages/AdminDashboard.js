import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
function AdminDashboard() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
    }

    fetchProducts();

  }, [navigate]);

  const fetchProducts = async () => {

    const res = await axios.get("http://localhost:5000/api/products");

    setProducts(res.data);

  };

  const deleteProduct = async (id) => {

    await axios.delete(`http://localhost:5000/api/products/${id}`);

    fetchProducts();

  };

  return (

    <div >

      <h2>Admin Dashboard</h2>

      <button onClick={() => navigate("/admin/add-product")}>
        Add Product
      </button>

      <table >

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
  onClick={() => navigate(`/admin/edit-product/${product._id}`)}
>
Edit
</button>

<button
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

  );
}

export default AdminDashboard;