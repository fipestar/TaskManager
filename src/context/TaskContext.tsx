import { createContext, useReducer, type Dispatch, type ReactNode } from "react"
import { initialState, taskReducer, type TaskActions, type TaskState } from "../reducers/Task-Reducer"

type TaskContextProps = {
    state: TaskState,
    dispatch: Dispatch<TaskActions>
}

type TaskProviderProps = {
    children: ReactNode
}

export const TaskContext = createContext<TaskContextProps>(null!)

export const TaskProvider = ({children}: TaskProviderProps) => {
    const [state, dispatch] = useReducer(taskReducer, initialState)

    return (
        <TaskContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}