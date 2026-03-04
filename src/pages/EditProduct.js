import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProduct.css";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    stock: ""
  });

  useEffect(() => {

    const fetchProduct = async () => {

      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(res.data);
    };

    fetchProduct();

  }, [id]);

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await axios.put(
      `http://localhost:5000/api/products/${id}`,
      product
    );

    alert("Product updated successfully");

    navigate("/admin/dashboard");
  };

  return (

    <div style={{padding:"40px"}}>

      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
        />

        <br/><br/>

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <br/><br/>

        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <br/><br/>

        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
        />

        <br/><br/>

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <br/><br/>

        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
        />

        <br/><br/>

        <button type="submit">
          Update Product
        </button>

      </form>

    </div>

  );
}

export default EditProduct;