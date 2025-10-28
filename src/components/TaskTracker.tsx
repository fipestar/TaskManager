import StatDisplay from "./StatDisplay";

export default function TaskTracker() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
      {/* Lado izquierdo → Gráfico o visual */}
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="70"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r="70"
              stroke="#3b82f6"
              strokeWidth="12"
              fill="transparent"
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-blue-600">
            50%
          </span>
        </div>
        <p className="mt-3 text-gray-600 font-medium text-center">
          Progreso de tus tareas
        </p>
      </div>

      {/* Lado derecho → Stats y botón */}
      <div className="flex flex-col gap-6 justify-center items-center">
        <button
          type="button"
          
          className="bg-pink-600 w-full md:w-auto px-5 py-2 rounded-lg text-white font-bold uppercase shadow-md hover:bg-pink-700 transition-colors"
        >
          Resetear tareas
        </button>

        <div className="flex flex-col gap-4 items-center">
        <StatDisplay label="Totales" value={12} color="text-blue-600" />
        <StatDisplay label="En Progreso" value={4} color="text-yellow-500" />
        <StatDisplay label="Completadas" value={7} color="text-green-600" />
        <StatDisplay label="Pendientes" value={1} color="text-red-600" />
</div>



      </div>
    </div>
  );
}
