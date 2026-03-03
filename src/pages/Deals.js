import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import "./Deals.css";

function Deals() {
  const { cart, addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour
  const [wishlist, setWishlist] = useState([]);

  const deals = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 2999,
      oldPrice: 4999,
      image: "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg"
    },
    {
      id: 2,
      name: "Smartphone",
      price: 15999,
      oldPrice: 19999,
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg"
    },
    {
      id: 3,
      name: "Sneakers",
      price: 3199,
      oldPrice: 4599,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
    }
  ];

  /* COUNTDOWN TIMER */
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const formatINR = (v) =>
    v.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR"
    });

  return (
    <>
      <Header />

      <section className="deals-hero">
        <h1>🔥 Today’s Deals</h1>
        <p>Ends in {formatTime()}</p>
      </section>

      <section className="deals-grid">
        {deals.map(item => {
          const isInCart = cart.some(p => p.id === item.id);

          return (
            <div className="deal-card" key={item.id}>
              {/* WISHLIST */}
              <span
                className={`wishlist ${
                  wishlist.includes(item.id) ? "active" : ""
                }`}
                onClick={() => toggleWishlist(item.id)}
              >
                ❤️
              </span>

              <img src={item.image} alt={item.name} />

              <h3>{item.name}</h3>

              <p className="price">
                {formatINR(item.price)}
                <span>{formatINR(item.oldPrice)}</span>
              </p>

              <button
                className={isInCart ? "added" : ""}
                disabled={isInCart}
                onClick={() => {
                  if (!isInCart) addToCart(item);
                }}
              >
                {isInCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </section>

      <Footer />
    </>
  );
}

export default Deals;