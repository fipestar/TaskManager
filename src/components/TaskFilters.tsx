import type { ChangeEvent } from "react";
import { useTask } from "../hooks/useTask";
import { statuses } from "../data/status";
import { priorities } from "../data/priorities";
import { projects } from "../data/projects";
import { X } from "lucide-react";

export default function TaskFilters() {
  const { state, dispatch } = useTask();

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch({
      type: 'set-filters',
      payload: {
        filters: {
          ...state.filters,
          [e.target.name]: e.target.value
        }
      }
    });
  };

  const clearFilters = () => {
    dispatch({ type: 'clear-filters' });
  };

  const hasActiveFilters = Object.values(state.filters).some(value => value !== '');

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            🔍 Filtros
          </h2>
          <p className="text-sm text-gray-500 mt-1">Personaliza tu búsqueda</p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg"
          >
            <X className="w-4 h-4" />
            Limpiar Filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Búsqueda por texto */}
        <div className="flex flex-col">
          <label htmlFor="searchText" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            🔎 Buscar
          </label>
          <input
            type="text"
            id="searchText"
            name="searchText"
            value={state.filters.searchText || ''}
            onChange={handleFilterChange}
            placeholder="Buscar tarea..."
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200 hover:border-gray-300"
          />
        </div>

        {/* Filtro por Estado */}
        <div className="flex flex-col">
          <label htmlFor="status" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            📌 Estado
          </label>
          <select
            id="status"
            name="status"
            value={state.filters.status || ''}
            onChange={handleFilterChange}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200 hover:border-gray-300 cursor-pointer"
          >
            <option value="">Todos los estados</option>
            {statuses.map(status => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Prioridad */}
        <div className="flex flex-col">
          <label htmlFor="priority" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            🔥 Prioridad
          </label>
          <select
            id="priority"
            name="priority"
            value={state.filters.priority || ''}
            onChange={handleFilterChange}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200 hover:border-gray-300 cursor-pointer"
          >
            <option value="">Todas las prioridades</option>
            {priorities.map(priority => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Proyecto */}
        <div className="flex flex-col">
          <label htmlFor="project" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            📁 Proyecto
          </label>
          <select
            id="project"
            name="project"
            value={state.filters.project || ''}
            onChange={handleFilterChange}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200 hover:border-gray-300 cursor-pointer"
          >
            <option value="">Todos los proyectos</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Indicador de filtros activos */}
      {hasActiveFilters && (
        <div className="mt-5 p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-700 font-medium">
            ✨ Mostrando tareas filtradas
          </p>
        </div>
      )}
    </div>
  );
}