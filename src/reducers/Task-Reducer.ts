export type TaskActions = 
    {type: 'add-task', payload: {task: string}} |
    {type: 'show-modal'} |
    {type: 'close-modal'}

export type TaskState = {
    task: string
    modal: boolean
}
export const initialState : TaskState = {
    task: '',
    modal: false
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
    
    return state
}