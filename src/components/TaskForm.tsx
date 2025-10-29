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
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-600 pb-2 mb-5">
        {state.editingId ? 'Editar Tarea' : 'Crear Nueva Tarea'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* Nombre de la tarea */}
      <div className="flex flex-col gap-2">
        <label htmlFor="taskName" className="text-xl">
          Nombre de la tarea:
        </label>
        <input
          type="text"
          id="taskName"
          placeholder="Ej. Diseñar la interfaz del dashboard"
          className="bg-slate-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:opacity-60"
          name="taskName"
          value={task.taskName}
          onChange={handleChange}
        />
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-xl">
          Descripción:
        </label>
        <textarea
          id="description"
          placeholder="Agrega una breve descripción de la tarea"
          className="bg-slate-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-gray-400 placeholder:opacity-60"
          name="description"
          rows={3}
          value={task.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="project" className="text-xl">
          Proyecto:
        </label>
        <select
          id="project"
          name="project"
          className="bg-slate-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <label htmlFor="status" className="text-xl">
          Estado:
        </label>
        <select
          id="status"
          className="bg-slate-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Prioridad */}
      <div className="flex flex-col gap-2">
        <label htmlFor="priority" className="text-xl">
          Prioridad:
        </label>
        <select
          id="priority"
          className="bg-slate-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <div className="flex flex-col gap-2">
  <label 
    htmlFor="dueDate"
    className="text-xl font-medium text-gray-700"

  >
    Fecha límite:
  </label>

  <DatePicker
    className="bg-slate-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    locale="es"
    dateFormat="dd/MM/yyyy"
    onChange={handleChangeDate}
    selected={task.date}
  />
</div>

<input 
  type="submit"
  className="bg-blue-600 w-full p-3 mt-4 text-white uppercase font-bold rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
  value={state.editingId ? 'Guardar Cambios' : 'Agregar Tarea'}
/>
    </form>
  );
}
