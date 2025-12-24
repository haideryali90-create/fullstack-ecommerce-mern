import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, LogIn, ArrowRight, Shield, Sparkles } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-neutral-light to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image/Illustration */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="w-full max-w-lg">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full min-h-[600px]">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1200&fit=crop&q=80"
                alt="Shopping experience"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=1200&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary-dark/80 to-primary/70"></div>
              <div className="relative h-full flex flex-col justify-between p-12 text-white">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-8 w-8" />
                    <h2 className="text-4xl font-bold">Welcome Back!</h2>
                  </div>
                  <p className="text-white/90 text-xl leading-relaxed">
                    Sign in to access your account and continue shopping amazing products
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Shield className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Secure Login</h3>
                      <p className="text-sm text-white/80">Your data is protected with industry-standard encryption</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Fast Checkout</h3>
                      <p className="text-sm text-white/80">Quick and easy shopping experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Exclusive Deals</h3>
                      <p className="text-sm text-white/80">Get access to special offers and discounts</p>
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
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-neutral">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                  <div className="w-0.5 sm:w-1 h-8 sm:h-10 lg:h-12 bg-primary-dark rounded-full"></div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Sign In</h2>
                </div>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Enter your credentials to access your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all text-sm sm:text-base lg:text-lg bg-accent"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-5 w-5 text-primary-dark focus:ring-primary-dark border-neutral rounded"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm font-medium text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-bold text-primary-dark hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-3 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-6 w-6" />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-neutral"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">New to our store?</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center w-full btn-secondary text-lg py-4"
                  >
                    Create an account
                    <ArrowRight className="ml-2 h-6 w-6" />
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
