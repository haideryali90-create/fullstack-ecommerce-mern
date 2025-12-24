import { Flame, Truck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function DiscountBar() {
  return (
    <div className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm md:text-base">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Flame className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 animate-pulse flex-shrink-0" />
            <span className="font-medium text-center sm:text-left">
              Summer Sale - All Products 50% OFF + Free Express Delivery!
            </span>
          </div>
          <Link
            to="/explore"
            className="sm:ml-2 flex items-center gap-1 font-semibold hover:underline underline-offset-2 whitespace-nowrap"
          >
            Shop Now
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DiscountBar;
