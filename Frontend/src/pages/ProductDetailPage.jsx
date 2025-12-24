import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productAPI } from "../services/api";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getProductById(id);
      setProduct(response.data.product);
      
      // Fetch related products
      if (response.data.product.category) {
        const relatedRes = await productAPI.getProductsByCategory(
          response.data.product.category.slug
        );
        setRelatedProducts(
          relatedRes.data.products.filter((p) => p._id !== id).slice(0, 4)
        );
      }
    } catch (error) {
      toast.error("Product not found");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    await addToCart(product._id, quantity);
  };

  const handleWishlistToggle = async () => {
    if (isInWishlist(product._id)) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product._id);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/explore" className="text-red-500 hover:underline">
          Browse Products
        </Link>
      </div>
    );
  }

  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div>
          <img
            src={product.images?.[0] || product.image || "https://via.placeholder.com/400"}
            alt={product.name}
            className="w-full rounded-lg border"
          />
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-20 h-20 border rounded-md cursor-pointer object-cover"
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* Rating & Reviews */}
          {product.rating > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-yellow-500">⭐ {product.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">
                ({product.reviews || 0} reviews)
              </span>
            </div>
          )}

          <div className="flex items-center gap-3 mb-2">
            <p className="text-red-500 text-2xl font-semibold">${finalPrice.toFixed(2)}</p>
            {product.oldPrice && (
              <p className="text-gray-400 line-through text-lg">${product.oldPrice.toFixed(2)}</p>
            )}
            {product.discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}
          </div>

          {product.stock > 0 ? (
            <p className="text-green-600 font-medium mb-4">In Stock ({product.stock} available)</p>
          ) : (
            <p className="text-red-600 font-medium mb-4">Out of Stock</p>
          )}

          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Category */}
          {product.category && (
            <p className="text-sm text-gray-500 mb-4">
              <strong>Category:</strong> {product.category.name}
            </p>
          )}

          {/* Brand */}
          {product.brand && (
            <p className="text-sm text-gray-500 mb-4">
              <strong>Brand:</strong> {product.brand}
            </p>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Colors:</h3>
              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: c }}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Actions */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-3 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-3 py-1"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`px-6 py-2 rounded-md ${
                isInWishlist(product._id)
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {isInWishlist(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Delivery & Warranty */}
          <div className="border rounded-md p-4 space-y-2 text-sm text-gray-600">
            <p>🚚 Free Delivery on orders above $50</p>
            <p>🔄 7-Day Return Policy</p>
            <p>🛡 1-Year Warranty</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Items</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <Link key={p._id} to={`/product/${p._id}`}>
                <ProductCard product={p} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
