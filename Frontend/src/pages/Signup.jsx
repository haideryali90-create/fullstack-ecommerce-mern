import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, User, UserPlus, ArrowRight, CheckCircle, Gift, Truck, Headphones } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await signup(name, email, password);
    setLoading(false);
    
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-neutral-light to-white flex items-center justify-center py-8 sm:py-12 px-3 sm:px-4 lg:px-6 xl:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
        {/* Left: Image/Illustration */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="w-full max-w-lg">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl h-full min-h-[500px] lg:min-h-[600px]">
              <img
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=1200&fit=crop&q=80"
                alt="Shopping experience"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1200&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary-dark/80 to-primary/70"></div>
              <div className="relative h-full flex flex-col justify-between p-6 lg:p-8 xl:p-12 text-white">
                <div>
                  <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                    <Gift className="h-6 w-6 lg:h-8 lg:w-8" />
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold">Join Us Today!</h2>
                  </div>
                  <p className="text-white/90 text-base lg:text-lg xl:text-xl leading-relaxed">
                    Create your account and start shopping amazing products with exclusive benefits
                  </p>
                </div>
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Gift className="h-6 w-6 lg:h-8 lg:w-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base lg:text-lg mb-1">Exclusive Deals</h3>
                      <p className="text-xs lg:text-sm text-white/80">Get access to special offers and member-only discounts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Truck className="h-6 w-6 lg:h-8 lg:w-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base lg:text-lg mb-1">Fast Delivery</h3>
                      <p className="text-xs lg:text-sm text-white/80">Quick and reliable shipping to your doorstep</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Headphones className="h-6 w-6 lg:h-8 lg:w-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base lg:text-lg mb-1">24/7 Support</h3>
                      <p className="text-xs lg:text-sm text-white/80">We're here to help you whenever you need us</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 xl:p-12 border border-neutral">
              <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                  <div className="w-0.5 sm:w-1 h-8 sm:h-10 lg:h-12 bg-primary-dark rounded-full"></div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Create Account</h2>
                </div>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Sign up to get started with your shopping journey</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                    <User className="inline h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary-dark" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all text-sm sm:text-base lg:text-lg bg-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                    <Mail className="inline h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary-dark" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all text-sm sm:text-base lg:text-lg bg-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                    <Lock className="inline h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary-dark" />
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Create a password (min. 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all text-sm sm:text-base lg:text-lg bg-accent"
                  />
                  <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-primary-dark" />
                    Must be at least 6 characters long
                  </p>
                </div>

                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-primary-dark focus:ring-primary-dark border-neutral rounded flex-shrink-0"
                  />
                  <label htmlFor="terms" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-600">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary-dark hover:text-primary font-bold">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary-dark hover:text-primary font-bold">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg py-3 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span>Create Account</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 sm:mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-neutral"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-3 sm:px-4 bg-white text-gray-500 font-medium">Already have an account?</span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center w-full btn-secondary text-sm sm:text-base lg:text-lg py-3 sm:py-4"
                  >
                    Sign in instead
                    <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
