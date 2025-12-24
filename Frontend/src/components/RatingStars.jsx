function Star({ filled }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`w-4 h-4 ${filled ? "fill-yellow-400" : "fill-gray-300"}`}
    >
      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.563-.954L10 0l2.949 5.956 6.563.954-4.756 4.635 1.122 6.545z" />
    </svg>
  );
}
export default function RatingStars({ rating = 0 }) {
  const round = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < round} />
      ))}
    </div>
  );
}
