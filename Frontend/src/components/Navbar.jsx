import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  Settings,
  Package,
  XCircle,
  Star,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="w-full border-b bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        {/* Left - Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 order-1"
        >
          Exclusive
        </Link>

        {/* Middle - Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base font-medium order-2">
          <NavLink to="/" className="hover:text-red-600 transition-colors">
            Home
          </NavLink>
          <NavLink to="/explore" className="hover:text-red-600 transition-colors">
            Shop
          </NavLink>
          <NavLink to="/contact" className="hover:text-red-600 transition-colors">
            Contact
          </NavLink>
          <NavLink to="/about" className="hover:text-red-600 transition-colors">
            About
          </NavLink>
          {!isAuthenticated && (
            <NavLink to="/signup" className="hover:text-red-600 transition-colors">
              Sign Up
            </NavLink>
          )}
        </nav>

        {/* Right - Search + Icons */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 relative order-3 w-full sm:w-auto">
          {/* Search box */}
          <form onSubmit={handleSearch} className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-40 md:w-48 lg:w-56 xl:w-64 rounded-md border-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute right-2 sm:right-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-500 pointer-events-none" />
          </form>

          {/* Icons */}
          <NavLink to="/wishlist" className="hover:text-red-600 relative transition-colors flex-shrink-0">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 text-[10px] sm:text-xs bg-red-600 text-white px-1 sm:px-1.5 rounded-full min-w-[16px] sm:min-w-[20px] text-center">
                {wishlist.length}
              </span>
            )}
          </NavLink>
          <NavLink to="/cart" className="hover:text-red-600 relative transition-colors flex-shrink-0">
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 text-[10px] sm:text-xs bg-red-600 text-white px-1 sm:px-1.5 rounded-full min-w-[16px] sm:min-w-[20px] text-center">
                {getCartItemCount()}
              </span>
            )}
          </NavLink>

          {/* User Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hover:text-red-600 transition-colors"
            >
              <User className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-50">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    {user?.role === "admin" && (
                      <NavLink
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" /> Admin Dashboard
                      </NavLink>
                    )}
                    <NavLink
                      to="/orders"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Package className="h-4 w-4" /> My Orders
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
