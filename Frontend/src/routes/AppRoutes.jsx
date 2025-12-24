import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import ProductDetailPage from "../pages/ProductDetailPage";
import Explore from "../pages/Explore";
import AdminDashboard from "../pages/AdminDashboard";
import MyOrders from "../pages/MyOrders";
import DiscountBar from "../components/DiscountBar";
import ScrollToTop from "../components/ScrollToTop";
import CheckoutPage from "../pages/CheckoutPage";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AppRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <DiscountBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Product />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRoutes;
