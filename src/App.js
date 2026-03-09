import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Deals from "./pages/Deals";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderHistory from "./pages/OrderHistory";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

import AddProduct from "./pages/AddProduct";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import EditProduct from "./pages/EditProduct";

import { CartProvider, useCart } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Toast from "./components/Toast";


function AppContent() {

  const { toast } = useCart();

  return (
    <>
      {/* Toast Notification */}
      <Toast message={toast} />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/deals" element={<Deals />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        {/* ORDERS */}

        <Route path="/orders" element={<Orders />} />

        <Route path="/order/:id" element={<OrderDetails />} />

        <Route
          path="/order-history"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/add-product" element={<AddProduct />} />

        <Route path="/admin/edit-product/:id" element={<EditProduct />} />

      </Routes>
    </>
  );
}


function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>

          <BrowserRouter>
            <AppContent />
          </BrowserRouter>

        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;