import { Link } from "react-router-dom";

export default function SectionHeader({ title, className = "", ...props }) {
  return (
    <h2 className={`text-xl font-semibold ${className}`} {...props}>
      {title}
    </h2>
  );
}
