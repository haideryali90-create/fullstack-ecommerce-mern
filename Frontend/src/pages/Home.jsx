import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DiscountBar from "../components/DiscountBar";
import CountdownTimer from "../components/CountdownTimer";
import CategoryCard from "../components/CategoryCard";
import PromoBanner from "../components/PromoBanner";
import ProductCard from "../components/ProductCard";
import HeroSection from "../components/HeroSection";
import SectionHeaderBlock from "../components/SectionHeaderBlock";
import { MdLocalShipping, MdHeadsetMic, MdCheckCircle } from "react-icons/md";
import { productAPI, categoryAPI } from "../services/api";
import { toast } from "react-toastify";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [flashDeals, setFlashDeals] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [exploreProducts, setExploreProducts] = useState([]);
  const [newArrival, setNewArrival] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch categories
      const categoriesRes = await categoryAPI.getCategories();
      setCategories(categoriesRes.data.categories);

      // Fetch products with discount (flash deals)
      const flashRes = await productAPI.getProducts({ limit: 8, sortBy: "discount", sortOrder: "desc" });
      setFlashDeals(flashRes.data.products.filter(p => p.discount > 0));

      // Fetch best selling (by rating)
      const bestRes = await productAPI.getProducts({ limit: 4, sortBy: "rating", sortOrder: "desc" });
      setBestSelling(bestRes.data.products);

      // Fetch explore products
      const exploreRes = await productAPI.getProducts({ limit: 8 });
      setExploreProducts(exploreRes.data.products);

      // Get first product as new arrival
      if (exploreRes.data.products.length > 0) {
        const tall = exploreRes.data.products[0];
        const smalls = exploreRes.data.products.slice(1, 4);
        setNewArrival({ tall, smalls });
      }
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const scrollFlash = (dir) => {
    const el = document.getElementById("flash-scroll");
    if (el) {
      el.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="bg-[#fafafa] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        {/* HERO SECTION */}
        <HeroSection />

        {/* FLASH SALES */}
        {flashDeals.length > 0 && (
          <section className="mt-6 sm:mt-8 lg:mt-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <SectionHeaderBlock label="Today's" title="Flash Sales" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
                <CountdownTimer minutes={180} />
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-full border hover:bg-gray-100 transition-colors"
                    aria-label="Scroll Left"
                    onClick={() => scrollFlash(-1)}
                  >
                    <svg width="18" height="18" className="sm:w-5 sm:h-5" fill="none">
                      <path d="M12 16l-4-4 4-4" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    className="p-2 rounded-full border hover:bg-gray-100 transition-colors"
                    aria-label="Scroll Right"
                    onClick={() => scrollFlash(1)}
                  >
                    <svg width="18" height="18" className="sm:w-5 sm:h-5" fill="none">
                      <path d="M8 8l4 4-4 4" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="relative">
              <div
                id="flash-scroll"
                className="flex gap-3 sm:gap-4 transition-all duration-300 overflow-x-auto scrollbar-hide pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {flashDeals.map((p) => (
                  <Link key={p._id} to={`/product/${p._id}`} className="flex-shrink-0">
                    <ProductCard product={p} />
                  </Link>
                ))}
              </div>
              <div className="flex justify-center mt-4 sm:mt-6">
                <Link
                  to="/explore"
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-md bg-red-500 text-white font-semibold text-sm sm:text-base lg:text-lg hover:bg-red-600 transition"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* BROWSE BY CATEGORY */}
        {categories.length > 0 && (
          <section className="mt-8 sm:mt-10 lg:mt-12">
            <SectionHeaderBlock label="Categories" title="Browse by Categories" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {categories.map((c) => (
                <CategoryCard key={c._id} label={c.name} icon={c.icon} to={`/explore?category=${c.slug}`} />
              ))}
            </div>
          </section>
        )}

        {/* BEST SELLING */}
        {bestSelling.length > 0 && (
          <section className="mt-8 sm:mt-10 lg:mt-12">
            <SectionHeaderBlock label="This Month" title="Best Selling Products" />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {bestSelling.map((p) => (
                <Link key={p._id} to={`/product/${p._id}`}>
                  <ProductCard product={p} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* BIG PROMO BANNER */}
        <section className="mt-8 sm:mt-10 lg:mt-12">
          <PromoBanner />
        </section>

        {/* EXPLORE PRODUCTS */}
        {exploreProducts.length > 0 && (
          <section className="mt-8 sm:mt-10 lg:mt-12">
            <SectionHeaderBlock label="Our Products" title="Explore Our Products" />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {exploreProducts.map((p) => (
                <Link key={p._id} to={`/product/${p._id}`}>
                  <ProductCard product={p} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* NEW ARRIVAL */}
        {newArrival && (
          <section className="mt-8 sm:mt-10 lg:mt-12">
            <SectionHeaderBlock label="Featured" title="New Arrival" />
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-6">
              {/* Left: Tall Card */}
              <div className="flex-1 rounded-xl overflow-hidden bg-black relative group">
                <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[2/3] xl:min-h-[500px]">
                  <img
                    src={newArrival.tall.images?.[0] || newArrival.tall.image || "https://via.placeholder.com/400"}
                    alt={newArrival.tall.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8 text-white">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 line-clamp-2">{newArrival.tall.name}</h3>
                  <p className="text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 opacity-90 leading-relaxed">{newArrival.tall.description}</p>
                  <Link
                    to={`/product/${newArrival.tall._id}`}
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-white text-gray-900 font-bold text-sm sm:text-base hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
              
              {/* Right: 3 Cards stacked */}
              <div className="flex flex-col flex-1 gap-4 sm:gap-5">
                {newArrival.smalls.map((p, idx) => (
                  <div
                    key={p._id}
                    className="flex-1 rounded-xl overflow-hidden bg-black relative group min-h-[180px] sm:min-h-[200px] lg:min-h-[220px]"
                  >
                    <img
                      src={p.images?.[0] || p.image || "https://via.placeholder.com/400"}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20"></div>
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5 lg:p-6 text-white">
                      <h4 className="font-bold text-base sm:text-lg lg:text-xl mb-1.5 sm:mb-2 line-clamp-1">{p.name}</h4>
                      <p className="text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 opacity-90 leading-relaxed">{p.description}</p>
                      <Link
                        to={`/product/${p._id}`}
                        className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-white text-gray-900 font-bold text-xs sm:text-sm hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SERVICE FEATURES */}
        <section className="mt-12 sm:mt-16 mb-0 relative bg-white border-t border-b border-neutral py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center px-4">
                <div className="rounded-full bg-white border-2 border-neutral p-4 sm:p-5 mb-4 sm:mb-5 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <MdLocalShipping size={28} className="sm:w-8 sm:h-8 text-primary-dark" />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">FREE AND FAST DELIVERY</h3>
                <p className="text-gray-500 text-sm sm:text-base max-w-xs mx-auto leading-relaxed">Free delivery for all orders over $140</p>
              </div>
              
              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center px-4">
                <div className="rounded-full bg-white border-2 border-neutral p-4 sm:p-5 mb-4 sm:mb-5 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <MdHeadsetMic size={28} className="sm:w-8 sm:h-8 text-primary-dark" />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">24/7 CUSTOMER SERVICE</h3>
                <p className="text-gray-500 text-sm sm:text-base max-w-xs mx-auto leading-relaxed">Friendly 24/7 customer support</p>
              </div>
              
              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center px-4">
                <div className="rounded-full bg-white border-2 border-neutral p-4 sm:p-5 mb-4 sm:mb-5 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <MdCheckCircle size={28} className="sm:w-8 sm:h-8 text-primary-dark" />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">MONEY BACK GUARANTEE</h3>
                <p className="text-gray-500 text-sm sm:text-base max-w-xs mx-auto leading-relaxed">We return money within 30 days</p>
              </div>
            </div>
          </div>
        </section>

        <div className="h-10" />
      </main>
    </div>
  );
}
