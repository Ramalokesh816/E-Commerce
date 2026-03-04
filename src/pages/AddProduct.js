import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./AddProduct.css";

function AddProduct() {

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    stock: "",
    discount: "",
    dealExpiry: ""
  });

  /* CHECK ADMIN LOGIN */
  useEffect(() => {

    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
    }

  }, [navigate]);

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/products",
        product
      );

      alert("Product Added Successfully!");
      navigate("/admin/dashboard");
      setProduct({
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
        stock: ""
      });

    } catch (error) {

      console.error(error);
      alert("Error adding product");

    }
  };

  return (
    <>
      <Header />

      <div className="add-product-wrapper">
  <div className="add-product-card">
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
          />

          <br /><br />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            required
          />

          <br /><br />

          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
          />
          <br /> <br />
          <input
  type="number"
  name="discount"
  placeholder="Discount (%)"
  value={product.discount}
  onChange={handleChange}
/>

          <br /><br />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
          />

          <br /><br />
          <input
  type="datetime-local"
  name="dealExpiry"
  value={product.dealExpiry}
  onChange={handleChange}
/>
<br /><br />


          <button type="submit">Add Product</button>

        </form>

      </div>
    </div>
      <Footer />
    </>
  );
}

export default AddProduct;