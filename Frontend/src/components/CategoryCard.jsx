import { Link } from "react-router-dom";

export default function CategoryCard({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="w-full border rounded-lg p-6 flex flex-col items-center justify-center gap-3 hover:shadow-md transition bg-white"
    >
      <div className="text-3xl">{icon}</div>
      <div className="text-sm font-medium">{label}</div>
    </Link>
  );
}
