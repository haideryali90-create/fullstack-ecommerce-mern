import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminAPI, productAPI, categoryAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { X, Plus, Edit, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Product form state
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    discount: "",
    category: "",
    stock: "",
    rating: "",
    reviews: "",
    brand: "",
    features: "",
    colors: "",
    isActive: true,
  });
  const [productImages, setProductImages] = useState([]);

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    icon: "Package",
    description: "",
  });

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
      toast.error("Access denied. Admin only.");
      return;
    }
    fetchData();
  }, [user, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "dashboard") {
        const statsRes = await adminAPI.getDashboardStats();
        setStats(statsRes.data.stats);
        setOrders(statsRes.data.recentOrders);
      } else if (activeTab === "products") {
        const productsRes = await productAPI.getProducts({ limit: 100 });
        setProducts(productsRes.data.products);
        const categoriesRes = await categoryAPI.getCategories();
        setCategories(categoriesRes.data.categories);
      } else if (activeTab === "categories") {
        const categoriesRes = await categoryAPI.getCategories();
        setCategories(categoriesRes.data.categories);
      } else if (activeTab === "orders") {
        const ordersRes = await adminAPI.getAllOrders();
        setOrders(ordersRes.data.orders);
      }
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", productForm.name);
      formData.append("description", productForm.description);
      formData.append("price", productForm.price);
      if (productForm.oldPrice) formData.append("oldPrice", productForm.oldPrice);
      if (productForm.discount) formData.append("discount", productForm.discount);
      formData.append("category", productForm.category);
      formData.append("stock", productForm.stock);
      if (productForm.rating) formData.append("rating", productForm.rating);
      if (productForm.reviews) formData.append("reviews", productForm.reviews);
      if (productForm.brand) formData.append("brand", productForm.brand);
      if (productForm.features) formData.append("features", productForm.features);
      if (productForm.colors) formData.append("colors", productForm.colors);
      formData.append("isActive", productForm.isActive);

      productImages.forEach((file) => {
        formData.append("images", file);
      });

      if (editingProduct) {
        await adminAPI.updateProduct(editingProduct._id, formData);
        toast.success("Product updated successfully!");
      } else {
        await adminAPI.createProduct(formData);
        toast.success("Product created successfully!");
      }

      setShowProductModal(false);
      setEditingProduct(null);
      resetProductForm();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await adminAPI.updateCategory(editingCategory._id, categoryForm);
        toast.success("Category updated successfully!");
      } else {
        await adminAPI.createCategory(categoryForm);
        toast.success("Category created successfully!");
      }

      setShowCategoryModal(false);
      setEditingCategory(null);
      resetCategoryForm();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save category");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await adminAPI.deleteProduct(productId);
      toast.success("Product deleted successfully!");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await adminAPI.deleteCategory(categoryId);
      toast.success("Category deleted successfully!");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      oldPrice: product.oldPrice || "",
      discount: product.discount || "",
      category: product.category._id || product.category,
      stock: product.stock,
      rating: product.rating || "",
      reviews: product.reviews || "",
      brand: product.brand || "",
      features: product.features?.join(", ") || "",
      colors: product.colors?.join(", ") || "",
      isActive: product.isActive,
    });
    setProductImages([]);
    setShowProductModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      icon: category.icon || "Package",
      description: category.description || "",
    });
    setShowCategoryModal(true);
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      oldPrice: "",
      discount: "",
      category: "",
      stock: "",
      rating: "",
      reviews: "",
      brand: "",
      features: "",
      colors: "",
      isActive: true,
    });
    setProductImages([]);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: "",
      icon: "Package",
      description: "",
    });
  };

  const openProductModal = () => {
    setEditingProduct(null);
    resetProductForm();
    setShowProductModal(true);
  };

  const openCategoryModal = () => {
    setEditingCategory(null);
    resetCategoryForm();
    setShowCategoryModal(true);
  };

  if (user?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          {["dashboard", "products", "categories", "orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize ${
                activeTab === tab
                  ? "border-b-2 border-red-500 text-red-500"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
              </div>
            ) : stats ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm mb-2">Total Users</h3>
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm mb-2">Total Products</h3>
                    <p className="text-3xl font-bold">{stats.totalProducts}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm mb-2">Total Orders</h3>
                    <p className="text-3xl font-bold">{stats.totalOrders}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm mb-2">Total Revenue</h3>
                    <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                  {orders.length === 0 ? (
                    <p className="text-gray-500">No recent orders</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Order ID</th>
                            <th className="text-left p-2">User</th>
                            <th className="text-left p-2">Total</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order._id} className="border-b">
                              <td className="p-2">{order._id.slice(-8)}</td>
                              <td className="p-2">{order.user?.name || "N/A"}</td>
                              <td className="p-2">${order.totalPrice.toFixed(2)}</td>
                              <td className="p-2">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  order.status === "delivered" ? "bg-green-100 text-green-800" :
                                  order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                  "bg-gray-100 text-gray-800"
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Products</h2>
              <button
                onClick={openProductModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Price</th>
                      <th className="text-left p-2">Stock</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-b">
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">${product.price.toFixed(2)}</td>
                        <td className="p-2">{product.stock}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            product.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {product.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-500 hover:underline mr-2 flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-500 hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Categories</h2>
              <button
                onClick={openCategoryModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </button>
            </div>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => {
                  const iconMap = {
                    'Phones': 'Smartphone',
                    'Computers': 'Laptop',
                    'SmartWatch': 'Watch',
                    'Camera': 'Camera',
                    'Headphones': 'Headphones',
                    'Gaming': 'Gamepad2',
                  };
                  const iconName = category.icon || 'Package';
                  return (
                    <div key={category._id} className="border p-4 rounded">
                      <div className="text-sm text-gray-500 mb-2">{iconName}</div>
                      <h3 className="font-semibold">{category.name}</h3>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="text-blue-500 hover:underline text-sm flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="text-red-500 hover:underline text-sm flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">All Orders</h2>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Order ID</th>
                      <th className="text-left p-2">User</th>
                      <th className="text-left p-2">Total</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b">
                        <td className="p-2">{order._id.slice(-8)}</td>
                        <td className="p-2">{order.user?.name || "N/A"}</td>
                        <td className="p-2">${order.totalPrice.toFixed(2)}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            order.status === "delivered" ? "bg-green-100 text-green-800" :
                            order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="p-2">
                          <select
                            className="border rounded px-2 py-1 text-xs"
                            onChange={async (e) => {
                              try {
                                await adminAPI.updateOrderStatus(order._id, e.target.value);
                                toast.success("Order status updated");
                                fetchData();
                              } catch (error) {
                                toast.error("Failed to update order status");
                              }
                            }}
                            value={order.status}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                    resetProductForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleProductSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    required
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    rows="3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Old Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productForm.oldPrice}
                      onChange={(e) => setProductForm({ ...productForm, oldPrice: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Discount (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productForm.discount}
                      onChange={(e) => setProductForm({ ...productForm, discount: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Stock *</label>
                    <input
                      type="number"
                      required
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select
                    required
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Brand</label>
                    <input
                      type="text"
                      value={productForm.brand}
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={productForm.rating}
                      onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Reviews Count</label>
                  <input
                    type="number"
                    value={productForm.reviews}
                    onChange={(e) => setProductForm({ ...productForm, reviews: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Features (comma separated)</label>
                  <input
                    type="text"
                    value={productForm.features}
                    onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                    placeholder="Feature 1, Feature 2, Feature 3"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Colors (comma separated)</label>
                  <input
                    type="text"
                    value={productForm.colors}
                    onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                    placeholder="#FF0000, #00FF00, #0000FF"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Product Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setProductImages(Array.from(e.target.files))}
                    className="w-full border rounded px-3 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">You can select multiple images</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={productForm.isActive}
                    onChange={(e) => setProductForm({ ...productForm, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium">
                    Product is Active
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    {editingProduct ? "Update Product" : "Create Product"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProductModal(false);
                      setEditingProduct(null);
                      resetProductForm();
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Category Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <button
                  onClick={() => {
                    setShowCategoryModal(false);
                    setEditingCategory(null);
                    resetCategoryForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Icon Name</label>
                  <input
                    type="text"
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                    placeholder="Package"
                    className="w-full border rounded px-3 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Icon name (e.g., Package, Smartphone, Laptop)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    rows="3"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    {editingCategory ? "Update Category" : "Create Category"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCategoryModal(false);
                      setEditingCategory(null);
                      resetCategoryForm();
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
