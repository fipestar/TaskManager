
import TaskTracker from "./components/TaskTracker"
import TaskModal from "./components/TaskModal"
import TaskList from "./components/TaskList"

function App() {

  return (
    <>
      <header className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-6 px-8 shadow-lg">
        <h1 className="text-4xl font-bold text-center">
          Gestor de tareas
        </h1>
      </header>

      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <TaskTracker />
      </div>
      
        <main className="max-w-4xl mx-auto mt-10">
          <TaskList />
          <TaskModal />
        </main>

    </>
  )
}

export default App
