type StatDisplayProps = {
    label: string;
    value: number;
    color?: string;
}

export default function StatDisplay({ label, value, color = 'text-gray-600' }: StatDisplayProps) {
    return (
    <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm w-full">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className={`text-2xl font-bold ${color}`}>{value}</span>
    </div>
  );
}