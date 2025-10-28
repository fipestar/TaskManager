import formatDate, { getItemById } from "../helpers"
import type { Task } from "../types"
import StatDisplay from "./StatDisplay"
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

  return (
    <div className="bg-white shadow-lg p-10 w-full max-w-md rounded-lg border-gray-200 flex gap-5 items-center">
      <div className="flex gap-3">
        {ProjectIcon && <ProjectIcon className="w-6 h-6 text-blue-600" />}
        {PriorityIcon && <PriorityIcon className="w-6 h-6 text-orange-600" />}
        {StatusIcon && <StatusIcon className="w-6 h-6 text-green-600" />}
      </div>

      <div>
        <p className="font-semibold text-lg">{task.taskName}</p>
        <p className="text-slate-600 text-sm">{formatDate(task.date!.toString())}</p>
      </div>

       <div className="flex flex-wrap justify-between mt-2">
        <StatDisplay label="Estado" value={status?.name || ''} />
        <StatDisplay label="Prioridad" value={priority?.name || ''} />
        <StatDisplay label="Proyecto" value={project?.name || ''} />
      </div>

      <TaskActions 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
