import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white mt-12">
      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Column 1: Exclusive */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Exclusive</h3>
          <div className="mb-2 font-medium">Subscribe</div>
          <div className="text-sm mb-4">Get 10% off your first order</div>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-transparent border border-gray-400 border-l-0 px-4 py-2 rounded-r-md flex items-center hover:bg-gray-900"
            >
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 11h12M13 7l4 4-4 4" />
              </svg>
            </button>
          </form>
        </div>

        {/* Column 2: Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <div className="text-sm mb-2">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</div>
          <div className="text-sm mb-2">exclusive@gmail.com</div>
          <div className="text-sm">+88015-88888-9999</div>
        </div>

        {/* Column 3: Account */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/account" className="hover:text-red-500">My Account</Link></li>
            <li><Link to="/login" className="hover:text-red-500">Login / Register</Link></li>
            <li><Link to="/cart" className="hover:text-red-500">Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-red-500">Wishlist</Link></li>
            <li><Link to="/shop" className="hover:text-red-500">Shop</Link></li>
          </ul>
        </div>

        {/* Column 4: Quick Link */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Link</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-red-500">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-red-500">Terms Of Use</Link></li>
            <li><Link to="/faq" className="hover:text-red-500">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-red-500">Contact</Link></li>
          </ul>
        </div>

        {/* Column 5: Download App */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Download App</h3>
          <div className="text-sm mb-2">Save $3 with App New User Only</div>
          <div className="flex items-center gap-2 mb-3">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=https://yourapp.com"
              alt="QR Code"
              className="w-14 h-14 bg-white p-1 rounded"
            />
            <div className="flex flex-col gap-2">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-7"
                />
              </a>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-7"
                />
              </a>
            </div>
          </div>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Facebook"><FaFacebookF size={20} /></a>
            <a href="#" aria-label="Twitter"><FaTwitter size={20} /></a>
            <a href="#" aria-label="Instagram"><FaInstagram size={20} /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn size={20} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
        <svg width="18" height="18" fill="none" stroke="gray" strokeWidth="2" className="inline-block mr-1" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        Copyright Rimel 2022. All right reserved
      </div>
    </footer>
  );
}

export default Footer;
