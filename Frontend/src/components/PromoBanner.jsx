import { Link } from "react-router-dom";
import AD from "../assets/images/ad.jpg";

export default function PromoBanner({
  title = "Enhance Your Music Experience",
  subtitle = "Special offer • Save 30%",
  cta = "Shop Now",
  to = "/category/audio",
  image = AD,
}) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-900 text-white w-full" style={{ minHeight: 340, height: 400 }}>
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative flex flex-col justify-center h-full p-12">
        <p className="text-green-400 font-semibold text-lg mb-2">Categories</p>
        <h3 className="mt-2 text-4xl md:text-5xl font-bold max-w-xl leading-tight">{title}</h3>
        {/* Example countdown circles */}
        <div className="flex gap-4 mt-8">
          {["23 Hours", "05 Days", "59 Minutes", "35 Seconds"].map((t, i) => (
            <div key={i} className="bg-white text-gray-900 rounded-full w-20 h-20 flex flex-col items-center justify-center font-bold text-lg">
              <span>{t.split(" ")[0]}</span>
              <span className="text-xs font-normal">{t.split(" ")[1]}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-start">
  <Link
    to={to}
    className="inline-block mt-6 px-16 py-4 rounded-md bg-green-500 hover:bg-green-600 text-white font-medium text-sm"
  >
    Buy Now!
  </Link>
</div>
      </div>
    </div>
  );
}
