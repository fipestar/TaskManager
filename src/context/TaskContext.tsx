import { createContext, useReducer, type Dispatch, type ReactNode } from "react"
import { initialState, taskReducer, type TaskActions, type TaskState } from "../reducers/Task-Reducer"
import { STATUS_IDS } from "../data/status"

type TaskContextProps = {
    state: TaskState,
    dispatch: Dispatch<TaskActions>,
    totalTasks: number,
    completedTasks: number,
    inProgressTasks: number,
    pendingTasks: number
}

type TaskProviderProps = {
    children: ReactNode
}

export const TaskContext = createContext<TaskContextProps>(null!)

export const TaskProvider = ({children}: TaskProviderProps) => {
    const [state, dispatch] = useReducer(taskReducer, initialState)
    const totalTasks = state.tasks.length;
    const completedTasks = state.tasks.filter(task => task.status === STATUS_IDS.COMPLETED).length;
    const inProgressTasks = state.tasks.filter(task => task.status === STATUS_IDS.IN_PROGRESS).length;
    const pendingTasks = state.tasks.filter(task => task.status === STATUS_IDS.PENDING).length;


    return (
        <TaskContext.Provider
            value={{
                state,
                dispatch,
                totalTasks,
                completedTasks,
                inProgressTasks,
                pendingTasks
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}