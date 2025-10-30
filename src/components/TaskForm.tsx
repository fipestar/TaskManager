import { projects } from "../data/projects";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';
import 'react-calendar/dist/Calendar.css'
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { DraftTask } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useTask } from "../hooks/useTask";
import { statuses } from "../data/status";
import { priorities } from "../data/priorities";

registerLocale('es', es);

export default function TaskForm() {
  const [task, setTask] = useState<DraftTask>({
    taskName: "",
    description: "",
    project: "",
    status: "",
    priority: "",
    date: new Date()
  })

  const [error, setError] = useState("");
  const {dispatch, state} = useTask();

  useEffect(() => {
    if(state.editingId != null) {
      const editingTask = state.tasks.find(task => task.id === state.editingId);
      if(editingTask) {
        setTask(editingTask);
      } 
    }
  }, [state.editingId, state.tasks, setTask])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeDate = (date: Date | null) => {
    setTask({
      ...task,
      date: date || new Date()
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(Object.values(task).includes('')){
      setError("Todos los campos son obligatorios");
      return;
    }
    
    if(state.editingId) {
      dispatch({type: 'update-task', payload: {task: {id: state.editingId, ...task}}});
    } else {
      dispatch({type: 'add-task', payload: {task}});
    }

    setTask({
      taskName: "",
      description: "",
      project: "",
      status: "",
      priority: "",
      date: new Date()
    })
  }
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="text-center border-b-2 border-gray-200 pb-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {state.editingId ? '✏️ Editar Tarea' : '➕ Nueva Tarea'}
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          {state.editingId ? 'Actualiza la información de tu tarea' : 'Completa los campos para crear una tarea'}
        </p>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* Nombre de la tarea */}
      <div className="flex flex-col gap-2">
        <label htmlFor="taskName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          📝 Nombre de la tarea
        </label>
        <input
          type="text"
          id="taskName"
          placeholder="Ej. Diseñar la interfaz del dashboard"
          className="bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 placeholder:opacity-60 transition-all duration-200 hover:border-gray-300"
          name="taskName"
          value={task.taskName}
          onChange={handleChange}
        />
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          📄 Descripción
        </label>
        <textarea
          id="description"
          placeholder="Agrega una breve descripción de la tarea"
          className="bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-gray-400 placeholder:opacity-60 transition-all duration-200 hover:border-gray-300"
          name="description"
          rows={4}
          value={task.description}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Grid de 2 columnas para los selects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="project" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            📁 Proyecto
          </label>
          <select
            id="project"
            name="project"
            className="bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 cursor-pointer"
            value={task.project}
            onChange={handleChange}
         >
            <option value="">-- Seleccione un proyecto --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            📌 Estado
          </label>
          <select
            id="status"
            className="bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 cursor-pointer"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="">-- Seleccione --</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de 2 columnas para prioridad y fecha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prioridad */}
        <div className="flex flex-col gap-2">
          <label htmlFor="priority" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            🔥 Prioridad
          </label>
          <select
            id="priority"
            className="bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 cursor-pointer"
            name="priority"
            value={task.priority}
            onChange={handleChange}
         >
            <option value="">-- Seleccione --</option>
            {priorities.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha límite */}
        <div className="flex flex-col gap-2">
          <label 
            htmlFor="dueDate"
            className="text-sm font-semibold text-gray-700 flex items-center gap-2"
          >
            📅 Fecha límite
          </label>
          <DatePicker
            className="bg-gray-50 border border-gray-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
            locale="es"
            dateFormat="dd/MM/yyyy"
            onChange={handleChangeDate}
            selected={task.date}
          />
        </div>
      </div>

      <button 
        type="submit"
        className="bg-linear-to-r from-blue-600 to-indigo-600 w-full p-4 mt-6 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {state.editingId ? '💾 Guardar Cambios' : '✨ Agregar Tarea'}
      </button>
    </form>
  );
}
