import { useMemo } from "react"
import TaskForm from "./components/TaskForm"
import { useTask } from "./hooks/useTask"
import TaskTracker from "./components/TaskTracker"

function App() {

  const { state } = useTask()
  const isValidTask = useMemo(() => state.task.trim().length > 0, [state.task])
  return (
    <>
      <header className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-6 px-8 shadow-lg">
        <h1 className="text-4xl font-bold text-center">
          Gestor de tareas
        </h1>
      </header>

      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        {isValidTask ? <TaskTracker /> : <TaskForm />}
      </div>
    </>
  )
}

export default App
