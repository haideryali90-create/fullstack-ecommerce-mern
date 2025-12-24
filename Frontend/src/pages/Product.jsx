// src/pages/ProductsPage.jsx
import { Link } from "react-router-dom";
import { flashDeals, bestSelling, exploreProducts } from "../data/mock";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  // merge all products into one array
  const allProducts = [
    ...flashDeals,
    ...bestSelling,
    ...exploreProducts,
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
