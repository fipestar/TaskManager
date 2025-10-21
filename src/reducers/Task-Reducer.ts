export type TaskActions = 
    {type: 'add-task', payload: {task: string}}

export type TaskState = {
    task: string
}
export const initialState : TaskState = {
    task: ''
}

export const taskReducer = (
    state: TaskState,
    action: TaskActions
): TaskState => {
    if(action.type === 'add-task') {
        return {
            ...state,
            task: action.payload.task
        }
    }
    return state
}