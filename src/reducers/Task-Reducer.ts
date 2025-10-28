import type { DraftTask, Task } from "../types"

export type TaskActions = 
    {type: 'add-task', payload: {task: DraftTask}} |
    {type: 'show-modal'} |
    {type: 'close-modal'} |
    {type: 'remove-task', payload: {id: Task['id']}}
    

export type TaskState = {
    tasks: Task[]
    modal: boolean
}
export const initialState : TaskState = {
    tasks: [],
    modal: false
}

const createTask = (draftTask: DraftTask) : Task => {
    return {
        ...draftTask,
        id: crypto.randomUUID()
    }
}

export const taskReducer = (
    state: TaskState = initialState,
    action: TaskActions
): TaskState => {
    if(action.type === 'add-task') {
        const task = createTask(action.payload.task);
        return {
            ...state,
            tasks: [...state.tasks, task],
            modal: false
        }
    }
    
    if(action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }
    
    if(action.type === 'close-modal') {
        return {
            ...state,
            modal: false
        }
    }
    if(action.type === 'remove-task') {
        return {
            ...state,
            tasks: state.tasks.filter( expense => expense.id !== action.payload.id)
        }
    }
    
    return state
}