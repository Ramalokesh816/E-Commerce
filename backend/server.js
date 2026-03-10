const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); // Required for serving the frontend

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

/* CONNECT DATABASE */
connectDB();

const app = express();

/* MIDDLEWARE */

app.use(cors({
  origin: [
    "https://e-commerce-2-y2k1.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

/* ROUTES */

app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);

/* SERVE FRONTEND */

// We go up one level from 'backend' to the root, 
// then into the 'build' folder (where npm run build puts your React app)
const buildPath = path.join(__dirname, "../build");

app.use(express.static(buildPath));

// The "Catch-all" handler: 
// This sends back the index.html file for any request that isn't an API route.
// This allows React Router to handle the URL, fixing the 404 error.
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

/* SERVER PORT */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});