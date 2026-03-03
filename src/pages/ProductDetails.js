import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { cart, addToCart } = useCart();

  // TEMP DATA (later from backend)
  const products = [
    {
      id: "1",
      name: "Casual Outfit",
      price: 2499,
      category: "Fashion",
      image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
      description: "Comfortable and stylish outfit suitable for daily wear."
    },
    {
      id: "2",
      name: "Sneakers",
      price: 3199,
      category: "Fashion",
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      description: "Lightweight sneakers designed for comfort and durability."
    },
    {
      id: "3",
      name: "Smartphone",
      price: 15999,
      category: "Electronics",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
      description: "High performance smartphone with long battery life."
    }
  ];

  const product = products.find(p => p.id === id);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

  // ✅ CHECK IF PRODUCT IS ALREADY IN CART
  const isInCart = cart.some(item => item.id === product.id);

  const formatINR = (value) =>
    value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR"
    });

  return (
    <>
      <Header />

      <section className="product-details">
        <div className="details-card">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400";
            }}
          />

          <div className="details-info">
            <h1>{product.name}</h1>
            <p className="category">{product.category}</p>
            <h2>{formatINR(product.price)}</h2>
            <p className="description">{product.description}</p>

            <button
              className={isInCart ? "added" : ""}
              disabled={isInCart}
              onClick={() => {
                if (!isInCart) addToCart(product);
              }}
            >
              {isInCart ? "✓ Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductDetails;