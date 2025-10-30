import formatDate, { getItemById } from "../helpers"
import type { Task } from "../types"
import { statuses } from "../data/status"
import { priorities } from "../data/priorities"
import { projects } from "../data/projects"
import { iconMap } from "../data/iconMap"
import TaskActions from "./TaskActions"
import { useTask } from "../hooks/useTask"

type TaskDetailProps = {
  task: Task
}



export default function TaskDetail({ task }: TaskDetailProps) {

  const { dispatch } = useTask();

  const status = getItemById(statuses, task.status)
  const priority = getItemById(priorities, task.priority)
  const project = getItemById(projects, task.project)

  const StatusIcon = status ? iconMap[status.iconKey as keyof typeof iconMap] : null
  const PriorityIcon = priority ? iconMap[priority.iconKey as keyof typeof iconMap] : null
  const ProjectIcon = project ? iconMap[project.iconKey as keyof typeof iconMap] : null

  const handleDelete = () => {
    dispatch({type: 'remove-task', payload: {id: task.id!}})
  }

  const handleEdit = () => {
    dispatch({type: 'get-task-by-id', payload: {id: task.id!}})
  }

  // Colores dinámicos según prioridad
  const getPriorityColors = () => {
    if (priority?.name === 'Alta') return 'border-red-200 bg-red-50/50';
    if (priority?.name === 'Media') return 'border-yellow-200 bg-yellow-50/50';
    return 'border-blue-200 bg-blue-50/50';
  };

  return (
    <div className={`bg-white hover:bg-gray-50 border-l-4 shadow-md hover:shadow-xl p-6 rounded-xl transition-all duration-200 ${getPriorityColors()}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Iconos y título */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex gap-2">
              {ProjectIcon && (
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ProjectIcon className="w-5 h-5 text-blue-600" />
                </div>
              )}
              {PriorityIcon && (
                <div className="p-2 bg-orange-100 rounded-lg">
                  <PriorityIcon className="w-5 h-5 text-orange-600" />
                </div>
              )}
              {StatusIcon && (
                <div className="p-2 bg-green-100 rounded-lg">
                  <StatusIcon className="w-5 h-5 text-green-600" />
                </div>
              )}
            </div>
          </div>

          {/* Título y descripción */}
          <h3 className="font-bold text-xl text-gray-800 mb-2">{task.taskName}</h3>
          <p className="text-gray-600 text-sm mb-4">{task.description}</p>

          {/* Fecha */}
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
            <span>📅</span>
            <span>{formatDate(task.date!.toString())}</span>
          </div>

          {/* Tags de información */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
              {project?.name || ''}
            </span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
              {status?.name || ''}
            </span>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
              {priority?.name || ''}
            </span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="shrink-0">
          <TaskActions 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}
