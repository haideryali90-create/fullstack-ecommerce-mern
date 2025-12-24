import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ProductCard from "./ProductCard";
import CountdownTimer from "./CountdownTimer";

function FlashSales({ flashDeals }) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4; // show 4 products at a time

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + visibleCount < flashDeals.length)
      setStartIndex(startIndex + 1);
  };

  return (
    <section className="mt-12">
      {/* Small Red Box + Today's */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-8 bg-red-600 rounded-sm" />
        <span className="text-red-600 font-medium">Today's</span>
      </div>

      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold text-gray-900">Flash Sales</h2>
          <CountdownTimer minutes={180} simple />
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full border hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full border hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Product Cards */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {flashDeals
          .slice(startIndex, startIndex + visibleCount)
          .map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
      </div>
    </section>
  );
}

export default FlashSales;
