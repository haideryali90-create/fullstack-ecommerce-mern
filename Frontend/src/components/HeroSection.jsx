import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { categoryAPI } from "../services/api";
import { toast } from "react-toastify";
import { 
  Smartphone, 
  Laptop, 
  Watch, 
  Camera, 
  Headphones, 
  Gamepad2,
  Package,
  Shirt,
  Home,
  Heart,
  Dumbbell,
  Baby,
  ShoppingBag,
  Sparkles as SparklesIcon
} from "lucide-react";

const iconMap = {
  'Phones': Smartphone,
  'Computers': Laptop,
  'SmartWatch': Watch,
  'Camera': Camera,
  'Headphones': Headphones,
  'Gaming': Gamepad2,
  'Woman\'s Fashion': Shirt,
  'Men\'s Fashion': Shirt,
  'Electronics': Smartphone,
  'Home & Lifestyle': Home,
  'Medicine': Heart,
  'Sports & Outdoor': Dumbbell,
  'Baby\'s & Toys': Baby,
  'Groceries & Pets': ShoppingBag,
  'Health & Beauty': SparklesIcon,
};

export default function HeroSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getCategories();
      setCategories(response.data.categories.slice(0, 9));
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto mt-4 sm:mt-6 px-4 sm:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Categories */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-neutral p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary-dark" />
            <h3 className="font-bold text-base sm:text-lg text-gray-800">Shop by Category</h3>
          </div>
        {loading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 bg-neutral animate-pulse rounded" />
            ))}
          </div>
        ) : (
          <ul className="space-y-2 sm:space-y-3">
            {categories.map((category) => {
              const IconComponent = iconMap[category.name] || Package;
              return (
                <li key={category._id}>
                  <Link
                    to={`/explore?category=${category.slug}`}
                    className="flex justify-between items-center text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-primary-light hover:text-primary-dark transition-all duration-200 group text-sm sm:text-base"
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 text-neutral group-hover:text-primary-dark transition-colors flex-shrink-0" />
                      <span className="truncate">{category.name}</span>
                    </div>
                    <ChevronRight 
                      size={14}
                      className="h-3 w-3 sm:h-4 sm:w-4 text-neutral group-hover:text-primary-dark transition-colors flex-shrink-0" 
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        </div>

        {/* Right Hero Banner */}
        <div className="lg:col-span-9 relative rounded-xl overflow-hidden shadow-lg">
          <div 
            className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&q=80')`
            }}
          >
            {/* Dark overlay for text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
            
            {/* Content */}
            <div className="relative h-full flex items-center p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="text-white max-w-xl">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-0.5 sm:w-1 h-8 sm:h-12 bg-white rounded-full"></div>
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/90">
                    New Collection
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                  Discover Amazing Products
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 text-white/90 leading-relaxed">
                  Shop the latest technology and lifestyle products with exclusive deals and fast delivery
                </p>
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 rounded-lg font-bold text-sm sm:text-base lg:text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 border-2 sm:border-4 border-white/30 backdrop-blur-sm"
                  style={{ 
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white shadow-lg"></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/50 shadow-lg"></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/50 shadow-lg"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
