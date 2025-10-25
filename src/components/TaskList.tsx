import { useMemo } from "react";
import { useTask } from "../hooks/useTask"
import TaskDetail from "./TaskDetail";

export default function TaskList() {
  const {state} = useTask();
  const isEmpty = useMemo(() => state.tasks.length === 0, [state.tasks])
  return (
    <div>
      {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay tareas disponibles</p> : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">Listado de Tareas</p>
          {state.tasks.map(task => (
            <TaskDetail
              key={task.id}
              task={task}
            />
          ))}
        </>
      )}
    </div>
  )
}
