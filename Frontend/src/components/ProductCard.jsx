import { FaHeart, FaRegEye, FaStar, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, variant = "default" }) {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  // Handle both old and new product structure
  const name = product.name || product.title;
  const image = product.images?.[0] || product.image;
  const price = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;
  const oldPrice = product.oldPrice || product.price;
  const rating = product.rating || 0;
  const discount = product.discount || 0;
  const reviews = product.reviews || 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product._id || product.id, 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product._id || product.id)) {
      removeFromWishlist(product._id || product.id);
    } else {
      addToWishlist(product._id || product.id);
    }
  };

  const handleRemoveFromWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWishlist(product._id || product.id);
  };

  const handleView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product._id || product.id}`);
  };

  return (
    <div
      className="relative bg-white rounded-xl border flex flex-col transition-shadow hover:shadow-lg cursor-pointer w-full max-w-[280px] mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Discount badge */}
      {discount > 0 && (
        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          -{discount}%
        </span>
      )}

      {/* Action icons */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {variant === "wishlist" ? (
          <button
            onClick={handleRemoveFromWishlist}
            className="p-1 rounded-full bg-white border hover:bg-gray-100"
          >
            <FaTrash className="text-gray-500" />
          </button>
        ) : variant === "viewOnly" ? (
          <button
            onClick={handleView}
            className="p-1 rounded-full bg-white border hover:bg-gray-100"
          >
            <FaRegEye className="text-gray-500" />
          </button>
        ) : (
          <>
            <button
              onClick={handleWishlistToggle}
              className={`p-1 rounded-full bg-white border hover:bg-gray-100 ${
                isInWishlist(product._id || product.id) ? "text-red-500" : ""
              }`}
            >
              <FaHeart className={isInWishlist(product._id || product.id) ? "fill-current" : ""} />
            </button>
            <button
              onClick={handleView}
              className="p-1 rounded-full bg-white border hover:bg-gray-100"
            >
              <FaRegEye className="text-gray-500" />
            </button>
          </>
        )}
      </div>

      {/* Product image */}
      <div className="flex-1 flex items-center justify-center mb-2 p-4 min-h-[200px] sm:min-h-[220px]">
        <img
          src={image || "https://via.placeholder.com/200"}
          alt={name}
          className="w-full h-full object-contain max-h-32 sm:max-h-40"
        />
      </div>

      {/* Product info */}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <div className="font-semibold text-xs sm:text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{name}</div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-red-600 font-bold text-base sm:text-lg">${price.toFixed(2)}</span>
          {oldPrice && oldPrice > price && (
            <span className="text-gray-400 line-through text-xs sm:text-sm">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-yellow-500 text-xs sm:text-sm">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(rating) ? "fill-current" : "text-gray-300"}`} />
          ))}
          <span className="text-gray-600 ml-1 sm:ml-2 text-xs sm:text-sm">({reviews})</span>
        </div>
      </div>

      {/* Add to Cart overlay on hover */}
      {hovered && variant === "default" && (
        <button
          onClick={handleAddToCart}
          className="absolute left-4 right-4 bottom-4 py-2 bg-gray-900 text-white rounded font-semibold hover:bg-gray-800 transition z-10"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
