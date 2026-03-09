import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

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

      try{

        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setProduct(res.data);

      }catch(error){
        console.log(error);
      }

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

    try{

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        product
      );

      alert("Product updated successfully");

      navigate("/admin/dashboard");

    }catch(error){

      console.log(error);

    }

  };


  return (

    <>
      <Header/>

      <section className="edit-page">

        <div className="edit-container">

          <h2>Edit Product</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
            />

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
            />

            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Category"
            />

            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="Image URL"
            />

            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Description"
            />

            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Stock"
            />

            <button type="submit" className="update-btn">
              Update Product
            </button>

          </form>

        </div>

      </section>

      <Footer/>
    </>
  );

}

export default EditProduct;