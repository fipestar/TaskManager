import { useState, type FormEvent } from "react"
import { useTask } from "../hooks/useTask"

export default function TaskForm() {
    const [task, setTask] = useState("")
    const {dispatch} = useTask()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type:'add-task', payload: {task}})
    }

    const isValid = task.trim().length > 0
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
            <label htmlFor="task" className="text-lg font-semibold text-gray-700">
                Nueva Tarea
            </label>
            <input
              id="task"
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Titulo de la tarea"
              name="task"
              value={task}
              onChange={handleChange}
              />
        </div>

        <input 
          type="submit"
          value="Crear Tarea"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isValid}
        />
    </form>
  )
}
