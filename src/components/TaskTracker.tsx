import { useTask } from "../hooks/useTask";
import StatDisplay from "./StatDisplay";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function TaskTracker() {
  const { totalTasks, completedTasks, inProgressTasks, pendingTasks } = useTask();

  // Calcular el porcentaje de tareas completadas
  const percentage = totalTasks > 0
    ? +((completedTasks / totalTasks) * 100).toFixed(2)
    : 0;

    const canRestartApp = totalTasks > 0;

    const {dispatch} = useTask();

  // Color dinámico según progreso
  const getPathColor = () => {
    if (percentage < 30) return '#ef4444'; // Rojo
    if (percentage < 70) return '#f59e0b'; // Naranja
    return '#10b981'; // Verde
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Lado izquierdo → Gráfico circular */}
      <div className="flex flex-col justify-center items-center p-6 bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <div className="w-52 h-52 mb-4">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              pathColor: getPathColor(),
              textColor: getPathColor(),
              trailColor: "#e5e7eb",
              textSize: "18px",
              pathTransitionDuration: 0.8,
            })}
          />
        </div>
        <p className="text-gray-700 font-semibold text-center text-lg">
          🎯 Progreso General
        </p>
        <p className="text-gray-500 text-sm mt-1">
          {completedTasks} de {totalTasks} tareas completadas
        </p>
      </div>

      {/* Lado derecho → Stats y botón */}
      <div className="flex flex-col gap-6 justify-center items-center lg:items-start">
        <button
          type="button"
          className="bg-linear-to-r from-pink-500 to-rose-500 w-full lg:w-auto px-8 py-3 rounded-xl text-white font-semibold uppercase shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
          disabled={!canRestartApp}
          onClick={() => dispatch({ type: 'restart-app' })}
        >
          🔄 Resetear Tareas
        </button>

        <div className="grid grid-cols-2 gap-4 w-full">
          <StatDisplay label="Totales" value={totalTasks} color="text-indigo-600" icon="📊" />
          <StatDisplay label="En Progreso" value={inProgressTasks} color="text-amber-500" icon="⚡" />
          <StatDisplay label="Completadas" value={completedTasks} color="text-emerald-600" icon="✅" />
          <StatDisplay label="Pendientes" value={pendingTasks} color="text-rose-500" icon="⏳" />
        </div>
      </div>
    </div>
  );
}
