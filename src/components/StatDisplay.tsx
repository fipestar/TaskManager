type StatDisplayProps = {
  label: string;
  value: string | number;
  color?: string;
  icon?: string;
};

export default function StatDisplay({ label, value, color = "text-blue-600", icon }: StatDisplayProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between">
        {icon && <span className="text-2xl">{icon}</span>}
        <span className={`text-3xl font-bold ${color}`}>
          {value}
        </span>
      </div>
      <p className="text-sm text-gray-600 font-medium mt-2">
        {label}
      </p>
    </div>
  );
}
