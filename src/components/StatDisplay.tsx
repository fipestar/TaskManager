type StatDisplayProps = {
  label: string;
  value: string | number; // Puede ser texto o número
  color?: string; // opcional para personalizar el color
};

export default function StatDisplay({ label, value, color = "text-blue-600" }: StatDisplayProps) {
  return (
    <p className="text-xl font-bold text-gray-700">
      {label}:{" "}
      <span className={`font-bold ${color}`}>
        {value}
      </span>
    </p>
  );
}
