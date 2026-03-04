import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(null);

  const products = [
    {
      id: "1",
      name: "Casual Outfit",
      price: 2499,
      category: "Fashion",
      images: [
        "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
        "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg"
      ],
      description: "Comfortable and stylish outfit suitable for daily wear."
    },
    {
      id: "2",
      name: "Sneakers",
      price: 3199,
      category: "Fashion",
      images: [
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
        "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg"
      ],
      description: "Lightweight sneakers designed for comfort and durability."
    },
    {
      id: "3",
      name: "Smartphone",
      price: 15999,
      category: "Electronics",
      images: [
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
        "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg"
      ],
      description: "High performance smartphone with long battery life."
    }
  ];

  const product = products.find(p => p.id === id);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

  const mainImage = selectedImage || product.images[0];
  const isInCart = cart.some(item => item.id === product.id);

  const formatINR = (value) =>
    value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR"
    });

  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Product link copied to clipboard!");
  };

  return (
    <>
      <Header />

      <section className="product-details">
        <div className="details-card">

          {/* IMAGE GALLERY */}
          <div className="image-gallery">
            <img className="main-image" src={mainImage} alt={product.name} />

            <div className="thumbnail-row">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => setSelectedImage(img)}
                  className={mainImage === img ? "active-thumb" : ""}
                />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="details-info">
            <h1>{product.name}</h1>
            <p className="category">{product.category}</p>
            <h2>{formatINR(product.price)}</h2>
            <p className="description">{product.description}</p>

            {/* REVIEWS */}
            <div className="rating">
              ⭐⭐⭐⭐☆ (4.0)
              <p>120 Reviews</p>
            </div>

            <button
              className={isInCart ? "added" : ""}
              disabled={isInCart}
              onClick={() => {
                if (!isInCart) addToCart(product);
              }}
            >
              {isInCart ? "✓ Added to Cart" : "Add to Cart"}
            </button>

            <button className="share-btn" onClick={handleShare}>
              Share Product 🔗
            </button>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="related-section">
        <h2>Related Products</h2>
        <div className="related-grid">
          {relatedProducts.map(item => (
            <div key={item.id} className="related-card">
              <img src={item.images[0]} alt={item.name} />
              <p>{item.name}</p>
              <span>{formatINR(item.price)}</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductDetails;