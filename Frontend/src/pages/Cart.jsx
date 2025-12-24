import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, loading, updateCartItem, removeFromCart, fetchCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <section className="px-4 md:px-12 py-10">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Please login to view your cart</p>
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="px-4 md:px-12 py-10">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
        </div>
      </section>
    );
  }

  const cartItems = cart?.items || [];
  const cartTotal = cart?.total || 0;

  return (
    <section className="px-4 md:px-12 py-10">
      <div className="text-sm text-gray-500 mb-6">
        Home / <span className="text-black font-medium">Cart</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <Link to="/explore" className="text-red-500 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Table */}
          <div className="bg-white border rounded-lg shadow-sm p-4 md:p-6">
            <div className="grid grid-cols-4 font-semibold text-gray-700 pb-3 border-b hidden md:grid">
              <span>Product</span>
              <span className="text-center">Price</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Subtotal</span>
            </div>

            {cartItems.map((item) => {
              const product = item.product || item;
              const productPrice = product?.price || 0;
              const discount = product?.discount || 0;
              const price = discount > 0
                ? productPrice * (1 - discount / 100)
                : productPrice;
              const quantity = item?.quantity || 1;
              const subtotal = price * quantity;

              return (
                <div
                  key={item._id || item.id}
                  className="grid grid-cols-1 md:grid-cols-4 items-center py-4 border-b gap-4"
                >
                  {/* Product */}
                  <div className="flex items-center gap-4">
                    <img
                      src={product?.images?.[0] || product?.image || "https://via.placeholder.com/100"}
                      alt={product?.name || "Product"}
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <span className="font-medium">{product?.name || "Product"}</span>
                      {product?.brand && (
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <span className="text-red-500 font-semibold">${price.toFixed(2)}</span>
                    {product?.oldPrice && product.oldPrice > price && (
                      <span className="text-gray-400 line-through text-sm ml-2">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-center">
                    <select
                      value={quantity}
                      onChange={(e) => updateCartItem(item._id || item.id, parseInt(e.target.value))}
                      className="border rounded-md px-2 py-1"
                    >
                      {[...Array(Math.min(product?.stock || 10, 10))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subtotal */}
                  <div className="flex items-center justify-end gap-3">
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item._id || item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-between mt-6 gap-3">
            <Link
              to="/explore"
              className="border px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Return To Shop
            </Link>
            <button
              onClick={fetchCart}
              className="border px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Update Cart
            </button>
          </div>

          {/* Coupon + Cart Total */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Coupon */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 border rounded-md h-12 px-2 text-sm"
              />
              <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 h-12 text-sm">
                Apply Coupon
              </button>
            </div>

            {/* Cart Total */}
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Cart Total</h3>
              <div className="flex justify-between py-2 border-b">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Shipping:</span>
                <span className={cartTotal > 140 ? "text-green-600 font-medium" : ""}>
                  {cartTotal > 140 ? "Free" : "$10.00"}
                </span>
              </div>
              <div className="flex justify-between py-2 font-semibold">
                <span>Total:</span>
                <span>${(cartTotal + (cartTotal > 140 ? 0 : 10)).toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-red-500 text-white py-3 rounded-md mt-4 hover:bg-red-600"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartPage;
