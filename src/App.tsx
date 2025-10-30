import TaskTracker from "./components/TaskTracker"
import TaskModal from "./components/TaskModal"
import TaskList from "./components/TaskList"
import TaskFilters from "./components/TaskFilters"
import { useEffect } from "react"
import { useTask } from "./hooks/useTask";

function App() {
const {state} = useTask();

  useEffect(() => {
    try {
      const serializable = state.tasks.map(t => ({
        ...t,
        date: t.date instanceof Date ? t.date.toISOString() : t.date
      }));
      localStorage.setItem('tasks', JSON.stringify(serializable));
    } catch (error) {
      console.error('No se pudo guardar tasks en localStorage:', error);
    }
  }, [state.tasks])

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-8 px-8 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight">
             Gestor de Tareas
          </h1>
          <p className="text-center text-blue-100 mt-2 text-sm md:text-base">
            Organiza tu trabajo de manera eficiente
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-white/50">
          <TaskTracker />
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 pb-24">
        <TaskFilters />
        <TaskList />
        <TaskModal />
      </main>
    </div>
  )
}

export default App
