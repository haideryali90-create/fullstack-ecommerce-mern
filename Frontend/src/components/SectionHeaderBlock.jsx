export default function SectionHeaderBlock({ label, title }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-4 h-6 bg-red-500 rounded-md" />
        <span className="text-red-500 font-semibold text-lg">{label}</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}