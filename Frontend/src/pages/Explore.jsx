import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productAPI, categoryAPI } from "../services/api";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";
import { Search, Filter, ChevronLeft, ChevronRight, Package } from "lucide-react";
import { 
  Smartphone, 
  Laptop, 
  Watch, 
  Camera, 
  Headphones, 
  Gamepad2,
  Grid3x3
} from "lucide-react";

const iconMap = {
  'Phones': Smartphone,
  'Computers': Laptop,
  'SmartWatch': Watch,
  'Camera': Camera,
  'Headphones': Headphones,
  'Gaming': Gamepad2,
};

export default function Explore() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, page, searchQuery]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 12,
      };

      if (selectedCategory) {
        params.category = selectedCategory;
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await productAPI.getProducts(params);
      setProducts(response.data.products);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categorySlug) => {
    setSelectedCategory(categorySlug === selectedCategory ? null : categorySlug);
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Sidebar - Categories */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border p-3 sm:p-4 lg:sticky lg:top-4">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Categories</h2>
              <div className="space-y-1.5 sm:space-y-2">
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={`w-full text-left px-3 sm:px-4 py-2 rounded-md transition flex items-center gap-2 text-sm sm:text-base ${
                    !selectedCategory
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <Grid3x3 className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>All Products</span>
                </button>
                {categories.map((category) => {
                  const IconComponent = iconMap[category.name] || Package;
                  return (
                    <button
                      key={category._id}
                      onClick={() => handleCategoryClick(category.slug)}
                      className={`w-full text-left px-3 sm:px-4 py-2 rounded-md transition flex items-center gap-2 text-sm sm:text-base ${
                        selectedCategory === category.slug
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="truncate">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-4 sm:mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border rounded-md px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-red-600 transition text-sm sm:text-base whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border h-[280px] sm:h-[320px] animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 text-base sm:text-lg">No products found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {products.map((product) => (
                    <Link key={product._id} to={`/product/${product._id}`}>
                      <ProductCard product={product} />
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-6 sm:mt-8">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 sm:px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition text-sm sm:text-base"
                    >
                      Previous
                    </button>
                    <span className="px-3 sm:px-4 py-2 text-sm sm:text-base flex items-center">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-3 sm:px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition text-sm sm:text-base"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
