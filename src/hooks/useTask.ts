import { useContext, useMemo } from "react"
import { TaskContext } from "../context/TaskContext"
import { STATUS_IDS } from "../data/status";

export const useTask = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTask debe ser usado dentro de TaskProvider');
    }

    const { state, dispatch } = context;

    // Filtrar tareas según los filtros activos
    const filteredTasks = useMemo(() => {
        return state.tasks.filter(task => {
            const matchesStatus = !state.filters.status || task.status === state.filters.status;
            const matchesPriority = !state.filters.priority || task.priority === state.filters.priority;
            const matchesProject = !state.filters.project || task.project === state.filters.project;
            const matchesSearch = !state.filters.searchText || 
                task.taskName.toLowerCase().includes(state.filters.searchText.toLowerCase()) ||
                task.description.toLowerCase().includes(state.filters.searchText.toLowerCase());

            return matchesStatus && matchesPriority && matchesProject && matchesSearch;
        });
    }, [state.tasks, state.filters]);

    // Contadores basados en TODAS las tareas (no filtradas)
    const totalTasks = state.tasks.length;
    const completedTasks = state.tasks.filter(task => task.status === STATUS_IDS.COMPLETED).length;
    const inProgressTasks = state.tasks.filter(task => task.status === STATUS_IDS.IN_PROGRESS).length;
    const pendingTasks = state.tasks.filter(task => task.status === STATUS_IDS.PENDING).length;

    return {
        state,
        dispatch,
        filteredTasks, // Tareas filtradas para mostrar en la lista
        totalTasks,
        completedTasks,
        inProgressTasks,
        pendingTasks
    }
}
