import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Deals from "./pages/Deals";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import { OrderProvider } from "./context/OrderContext";
import OrderHistory from "./pages/OrderHistory";
function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <OrderProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={
              <ProtectedRoute><Cart /></ProtectedRoute>
            }/>
          <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            }/>
<Route path="/deals" element={<Deals />} />
<Route path="/checkout" element={
  <ProtectedRoute><Checkout /></ProtectedRoute>
} />

<Route path="/order-success" element={
  <ProtectedRoute><OrderSuccess /></ProtectedRoute>
} />
<Route path="/orders" element={
  <ProtectedRoute><OrderHistory /></ProtectedRoute>
} />
        </Routes>
      </BrowserRouter>
        </OrderProvider>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;