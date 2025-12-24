import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orderAPI } from "../services/api";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, fetchCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      toast.error("Please login to checkout");
      return;
    }

    if (cart.items.length === 0) {
      navigate("/cart");
      toast.error("Your cart is empty");
      return;
    }

    // Pre-fill form with user data if available
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
      }));
    }
  }, [isAuthenticated, cart, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const shippingAddress = {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
      };

      await orderAPI.createOrder({
        shippingAddress,
        paymentMethod,
      });

      toast.success("Order placed successfully!");
      await fetchCart();
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to place order";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || cart.items.length === 0) {
    return null;
  }

  const shippingPrice = cart.total > 140 ? 0 : 10;
  const taxPrice = cart.total * 0.1;
  const totalPrice = cart.total + shippingPrice + taxPrice;

  return (
    <section className="px-4 md:px-12 py-10">
      <div className="text-sm text-gray-500 mb-6">
        Cart / <span className="text-black font-medium">Checkout</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Billing Details */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name*</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Street Address*</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City*</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Postal Code*</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country*</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number*</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {/* Product items */}
              {cart.items.map((item) => {
                const product = item.product;
                const price = product.discount
                  ? product.price * (1 - product.discount / 100)
                  : product.price;
                const subtotal = price * item.quantity;

                return (
                  <div key={item._id} className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images?.[0] || product.image || "https://via.placeholder.com/100"}
                        alt={product.name}
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <span className="font-medium">{product.name}</span>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                );
              })}

              {/* Totals */}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className={shippingPrice === 0 ? "text-green-600 font-medium" : ""}>
                    {shippingPrice === 0 ? "Free" : `$${shippingPrice.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span>${taxPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-4">
                <h3 className="font-semibold">Payment Method</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    id="card"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="card">Credit/Debit Card</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    id="cash"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    defaultChecked
                  />
                  <label htmlFor="cash">Cash on delivery</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    id="paypal"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>

              {/* Place Order */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutPage;
