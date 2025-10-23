import { projects } from "../data/projects";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';
import 'react-calendar/dist/Calendar.css'
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es', es);


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
export default function TaskForm() {
  return (
    <form className="space-y-5">
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-600 pb-2 mb-5">
        Nueva Tarea
      </legend>

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
        >
          <option value="">-- Seleccione --</option>
          <option value="pendiente">Pendiente</option>
          <option value="en-progreso">En progreso</option>
          <option value="completada">Completada</option>
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
        >
          <option value="">-- Seleccione --</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
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
  />
</div>

<input 
  type="submit"
  className="bg-blue-600 w-full p-3 mt-4 text-white uppercase font-bold rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
  value="Guardar Tarea" 
/>
    </form>
  );
}
