import { useMemo } from "react";
import { useTask } from "../hooks/useTask";
import TaskDetail from "./TaskDetail";

export default function TaskList() {
  const { filteredTasks } = useTask();

  const isEmpty = useMemo(() => filteredTasks.length === 0, [filteredTasks]);

  return (
    <div className="mt-8">
      {isEmpty ? (
        <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-lg border border-gray-200 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No hay tareas disponibles
          </h3>
          <p className="text-gray-500">
            Comienza agregando una nueva tarea usando el botón flotante
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📋 Tus Tareas
            <span className="text-sm font-normal text-gray-500">({filteredTasks.length})</span>
          </h2>
          {filteredTasks.map(task => (
            <TaskDetail key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
