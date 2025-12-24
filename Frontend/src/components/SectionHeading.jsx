export default function SectionHeading({ label }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="w-4 h-6 bg-red-500 rounded-md" />
      <span className="text-red-500 font-semibold text-xl">{label}</span>
    </div>
  );
}